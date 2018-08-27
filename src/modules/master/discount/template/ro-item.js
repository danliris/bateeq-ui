import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
var FinishedItemLoader = require("./../../../../loader/finishgood-loader-discount");
const moment = require('moment');

@inject(Service)
export class ROItem {
    @bindable realizationOrder;

    columns;

    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        this.isShowing = false;

        if (this.data.realizationOrder) {
            this.isShowing = true;
            this.realizationOrder = this.data.realizationOrder;
        }

        this.columns = ["Barcode", "RO", "Nama Produk", "Keterangan"];
        if (!this.readOnly) {
            this.columns.push("");
        }
        this.innerData = context.context.options.innerData;
    }

    async realizationOrderChanged(newValue, oldValue) {
        var innerData = this.innerData;
        if (newValue) {
            var products = await FinishedItemLoader(newValue.realizationOrder);
            var processedData = {
                realizationOrder: newValue,
                itemsDetails: []
            };

            for (let item of products) {
                var hasItem = await this.service.getItemByCode(item.code);

                if (hasItem.length > 0) {

                    hasItem.forEach(dataItem => {
                        var formStart = moment(innerData.startDate).startOf('day');
                        var formEnd = moment(innerData.endDate).endOf('day');
                        var itemStart = moment(dataItem.startDate).startOf('day');
                        var itemEnd = moment(dataItem.endDate).endOf('day');
                        if (formStart >= itemStart &&
                            formStart <= itemEnd ||
                            itemStart >= formStart &&
                            itemStart <= formEnd) {
                            item["error"] = "Produk sudah digunakan";
                        }
                    });
                }

                processedData.itemsDetails.push(item);
            }

            Object.assign(this.data, processedData);
            this.isShowing = true;
        } else {
            this.data = {};
        }
    }

    get articleRealizationOrderLoader() {
        return (keyword, filter) => {
            return FinishedItemLoader(keyword, filter)
                .then(data => {
                    if (keyword.toUpperCase() === "NONE" ||
                        keyword.toUpperCase() === "NO") {
                        this.isShowing = true;
                        return this.data['realizationOrder'] = { 'realizationOrder': 'NO' };
                    } else {
                        return this.removeRedundantRO(data);
                    }
                });

        };
    }

    removeRedundantRO(data) {
        var realizationOrders = data.map(item => {
            return { 'realizationOrder': item.article.realizationOrder };
        });

        function removeDuplicates(originalArray, prop) {
            var newArray = [];
            var lookupObject = {};

            for (var i in originalArray) {
                lookupObject[originalArray[i][prop]] = originalArray[i];
            }

            for (i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
            return newArray;
        }

        return removeDuplicates(realizationOrders, 'realizationOrder');
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
        this.bind();
    }

    get addItem() {
        return (event) => {
            this.data.itemsDetails.push({});
        };
    }
}