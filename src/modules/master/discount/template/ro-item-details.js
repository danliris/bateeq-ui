import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
var ItemLoader = require('../../../../loader/finishgood-loader-discount');
const moment = require('moment');

@inject(Service)
export class ROItemDetails {

    constructor(service) {
        this.service = service;
        this.innerData = {};
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.innerData = this.options.innerData;
        this.readOnly = context.options.readOnly;

        if (this.data.code) {
            if (this.data.code._id) {
                this.data = this.data.code;
            }
        }

        if (this.data) {
            var error = this.data.error;

            if (error) {
                this.error = {};
                this.error['code'] = this.data.error;
            }
        }
    }

    async codeChanged(e) {
        this.error = {};
        var innerData = this.innerData;
        var item = await this.service.getItemByCode(e.srcElement.value);

        if (item.length > 0) {
            var errorCode = "";

            item.forEach(dataItem => {
                var formStart = moment(innerData.startDate).startOf('day');
                var formEnd = moment(innerData.endDate).endOf('day');
                var itemStart = moment(dataItem.startDate).startOf('day');
                var itemEnd = moment(dataItem.endDate).endOf('day');
                if (innerData.discountOne == dataItem.discountOne &&
                    innerData.discountTwo == dataItem.discountTwo) {

                    if (formStart >= itemStart &&
                        formStart <= itemEnd ||
                        itemStart >= formStart &&
                        itemStart <= formEnd) {
                        errorCode = "Produk sudah digunakan";
                    }
                } else {

                    if (formStart >= itemStart &&
                        formStart <= itemEnd ||
                        itemStart >= formStart &&
                        itemStart <= formEnd) {
                        errorCode = "Produk sudah digunakan";
                    }
                }
            });

            this.error.code = errorCode;
        }
        var itemsData = this.data.code;
        Object.assign(this.data, itemsData);
    }

    get itemLoader() {
        return ItemLoader;
    }
}