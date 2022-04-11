import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
var FinishedItemLoader = require("./../../../../loader/finishgood-loader-discount");
const moment = require('moment');

@inject(Service)
export class ROItem {
    @bindable realizationOrder;

    columns;
    RO;
    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.data = context.data;
        this.error = context.error;
        console.log(context);
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
        var processedData = {
            realizationOrder: newValue,
            itemsDetails: []
        };

        if (newValue && newValue.realizationOrder != 'NO') {
            // var products = await FinishedItemLoader(newValue.realizationOrder);
            
            this.service.getItemByRo(newValue.realizationOrder)
                .then(result => {
                    //console.log(result);
                    // if(result.length > 0) {
                    //     result.forEach(dataItem => {
                    //         var formStart = moment(innerData.startDate).startOf('day');
                    //         var formEnd = moment(innerData.endDate).endOf('day');
                    //         var itemStart = moment(dataItem.startDate).startOf('day');
                    //         var itemEnd = moment(dataItem.endDate).endOf('day');
                    //         console.log(itemEnd)
                    //         if (innerData.discountOne == dataItem.discountOne &&
                    //             innerData.discountTwo == dataItem.discountTwo) {

                    //             if (formStart >= itemStart &&
                    //                 formStart <= itemEnd ||
                    //                 itemStart >= formStart &&
                    //                 itemStart <= formEnd) {
                    //                 item["error"] = "Produk sudah digunakan";
                    //             }
                    //         } else {

                    //             if (formStart >= itemStart &&
                    //                 formStart <= itemEnd ||
                    //                 itemStart >= formStart &&
                    //                 itemStart <= formEnd) {
                    //                 item["error"] = "Produk sudah digunakan";
                    //             }
                    //         }
                    //     });
                        this.data.realizationOrder = newValue.realizationOrder
                        this.data.details = []
                        for(var datas of result){
                            //console.log(datas);
                            this.data.details.push(datas)
                        }
                        //this.readOnly = true;
                        //this.RO = newValue.realizationOrder
                        
                })

            // for (let item of products) {
            //     var hasItem = await this.service.getItemByCode(item.code);

            //     if (hasItem.length > 0) {

            //         hasItem.forEach(dataItem => {
            //             var formStart = moment(innerData.startDate).startOf('day');
            //             var formEnd = moment(innerData.endDate).endOf('day');
            //             var itemStart = moment(dataItem.startDate).startOf('day');
            //             var itemEnd = moment(dataItem.endDate).endOf('day');

            //             if (innerData.discountOne == dataItem.discountOne &&
            //                 innerData.discountTwo == dataItem.discountTwo) {

            //                 if (formStart >= itemStart &&
            //                     formStart <= itemEnd ||
            //                     itemStart >= formStart &&
            //                     itemStart <= formEnd) {
            //                     item["error"] = "Produk sudah digunakan";
            //                 }
            //             } else {

            //                 if (formStart >= itemStart &&
            //                     formStart <= itemEnd ||
            //                     itemStart >= formStart &&
            //                     itemStart <= formEnd) {
            //                     item["error"] = "Produk sudah digunakan";
            //                 }
            //             }
            //         });
            //     }

            //     processedData.itemsDetails.push(item);
            // }

            // Object.assign(this.data, processedData);
            //console.log(this.data);
        } else {
            this.data.realizationOrder = '';
            this.data.itemsDetails = {};
        }
        this.isShowing = true;
    }

    get articleRealizationOrderLoader() {
        return (keyword, filter) => {
            return FinishedItemLoader(keyword, filter)
                .then(data => {
                    if (keyword.toUpperCase() === "NONE" ||
                        keyword.toUpperCase() === "NO") {
                        this.isShowing = true;
                        data = [];
                        return this.removeRedundantRO(data);
                    } else {
                        return this.removeRedundantRO(data);
                    }
                });

        };
    }

    removeRedundantRO(data) {
        var realizationOrders = [];

        if (data.length > 0) {
            realizationOrders = data.map(item => {
                return { 'realizationOrder': item.ArticleRealizationOrder };
            });
        } else {
            realizationOrders.push({ 'realizationOrder': 'NO' });
        }

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
            this.data.details.push({});
        };
    }
}