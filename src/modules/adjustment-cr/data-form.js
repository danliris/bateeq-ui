import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var SourceLoader = require('../../loader/storage-loader');

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    sources = [];
    hasFocus = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }


    async attached() {
        this.sumTotalQty = 0;
        this.sumPrice = 0;
        // var storages = await this.service.getStorage();
        // this.sources = storages;
        // this.sources = this.sources.map(source => {
        //     source.toString = function () {
        //         return this.name;
        //     }
        //     return source;
        // })
    }

    async barcodeChoose(e) {
        var itemData = e.target.value;
        this.price = 0;
        if (itemData && itemData.length >= 13) {
            var fgTemp = await this.service.getByCode(itemData);
            if (fgTemp != undefined) {
                if (Object.getOwnPropertyNames(fgTemp).length > 0) {
                    var fg = fgTemp[0];
                    this.price = fg.domesticSale;
                    if (fg != undefined && Object.getOwnPropertyNames(fg).length > 0) {
                        var newItem = {};
                        var _data = this.data.items.find((item) => item.code === fg.code);
                        if (!_data) {
                            this.qtyFg = 0;
                            this.price = 0;
                            newItem.itemId = fg._id;
                            newItem.availableQuantity = 0;
                            var result = await this.service.getDataInventory(this.data.source._id, newItem.itemId);
                            if (result != undefined) {
                                newItem.availableQuantity = result.quantity;
                            }
                            newItem.name = fg.name;
                            newItem.code = fg.code;
                            this.qtyFg = this.qtyFg + 1;
                            newItem.quantity = 1;
                            newItem.price = parseFloat(fg.domesticSale)
                            newItem.remark = "";
                            this.data.items.push(newItem);
                        } else {
                            this.firstPrice = 0;
                            this.qtyFg = parseInt(_data.quantity) + 1;
                            this.firstPrice = this.qtyFg * this.price
                            _data.price = parseFloat(this.firstPrice)
                            _data.quantity = this.qtyFg;
                        }
                    }
                }
            }
            this.barcode = "";
        }
    }

    sourceChange(e) {
        this.data.items = [];
        if (this.data.source && this.data.source._id)
            this.data.sourceId = this.data.source._id;
        else
            this.data.sourceId = null;
    }

    get hasSource() {
        return this.data && this.data.sourceId && this.data.sourceId !== '';
    }

    async nameChoose(e) {
        this.hasFocus = false;
        var itemData = e.detail;
        if (itemData && itemData.code && itemData.code !== "") {
            if (Object.getOwnPropertyNames(itemData).length > 0) {
                var newItem = {};
                var _data = this.data.items.find((item) => item.code === itemData.code);
                if (!_data) {
                    this.qtyFg = 0;
                    this.price = 0;
                    newItem.itemId = itemData._id;
                    newItem.availableQuantity = 0;
                    var result = await this.service.getDataInventory(this.data.source._id, newItem.itemId);
                    if (result != undefined) {
                        newItem.availableQuantity = result.quantity;
                    }
                    newItem.name = itemData.name;
                    newItem.code = itemData.code;
                    newItem.quantity = 1;
                    this.qtyFg = this.qtyFg + 1;
                    this.price = itemData.domesticSale;
                    newItem.price = parseFloat(itemData.domesticSale);
                    newItem.remark = "";
                    this.data.items.push(newItem);
                }
                this.item = null;
            }
        }
    }
    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    inQtyChanged(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items[itemIndex].Qty = this.data.items[itemIndex].availableQuantity + this.data.items[itemIndex].inQty;
        if (this.data.items[itemIndex].outQty && this.data.items[itemIndex].outQty > 0) {
            this.data.items[itemIndex].Qty = this.data.items[itemIndex].Qty - this.data.items[itemIndex].outQty;
        }
    }
    outQtyChanged(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items[itemIndex].Qty = this.data.items[itemIndex].availableQuantity - this.data.items[itemIndex].outQty;
        if (this.data.items[itemIndex].inQty && this.data.items[itemIndex].inQty > 0) {
            this.data.items[itemIndex].Qty = this.data.items[itemIndex].Qty + this.data.items[itemIndex].inQty;
        }
    }

    get sourceLoader() {
        return SourceLoader;
    }
}
