import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    @bindable source;
    dataSource = {};
    sources = [];
    destinations = [];
    item;
    barcode;
    qtyFg;
    price;
    firstPrice = 0;
    indexSource = 0;
    hasFocus = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    sumTotalQty;
    sumPrice;

    getStorage(config) {
        return new Promise((resolve, reject) => {
            var getStorages = [];
            if (config.source.type && config.source.type == "selection") {
                for (var sourceId of config.source.value) {
                    getStorages.push(this.service.getStorageById(sourceId.toString()));
                    this.indexSource++;
                }
            }
            else {
                if (config.source.value) {
                    getStorages.push(this.service.getStorageById(config.source.value.toString()));
                    this.indexSource++
                }
            }
            var getStoragesDestination = [];
            if (config.destination.type && config.destination.type == "selection") {
                for (var destinationId of config.destination.value) {
                    getStorages.push(this.service.getStorageById(destinationId.toString()));
                }
            }
            else {
                if (config.destination.value) {
                    getStorages.push(this.service.getStorageById(config.destination.value.toString()));
                }
            }
            resolve(Promise.all(getStorages));
        })
    }

    async attached() {
        this.sumTotalQty = 0;
        this.sumPrice = 0;
        var storages = await this.service.getModuleConfig();
        var result = await this.getStorage(storages[0].config);

        this.sources = result.splice(0, this.indexSource);
        this.destinations = result.splice(0);
        this.sources = this.sources.map(source => {
            source.toString = function () {
                return this.name;
            }
            return source;
        })
        this.destinations = this.destinations.map(destination => {
            destination.toString = function () {
                return this.name;
            }
            return destination;
        })
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
                            var result = await this.service.getDataInventory(this.dataSource._id, newItem.itemId);
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
            this.makeTotal(this.data.items);
            this.barcode = "";
        }

    }

    async nameChoose(e) {
        this.hasFocus = false;
        var itemData = e.detail;
        if (itemData != undefined) {
            if (Object.getOwnPropertyNames(itemData).length > 0) {
                var newItem = {};
                var _data = this.data.items.find((item) => item.code === itemData.code);
                if (!_data) {
                    this.qtyFg = 0;
                    this.price = 0;
                    newItem.itemId = itemData._id;
                    newItem.availableQuantity = 0;
                    var result = await this.service.getDataInventory(this.dataSource._id, newItem.itemId);
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
                this.makeTotal(this.data.items);
                this.item = null;
            }
        }

    }

    async qtyChange(code, qty) {
        var barcode = code;
        var quantity = qty;
        this.price = 0;
        if (quantity != undefined) {
            var fgTemp = await this.service.getByCode(code);
            var fg = fgTemp[0];
            this.price = fg.domesticSale;
            var newItem = {};
            var _data = this.data.items.find((item) => item.code === barcode);
            if (_data) {
                this.price = parseInt(_data.quantity) * this.price
                _data.price = parseFloat(this.price);
            }
        }
        this.makeTotal(this.data.items);
    }

    makeTotal(items) {
        debugger
        this.sumTotalQty = 0;
        this.sumPrice = 0;
        if (Object.getOwnPropertyNames(items).length > 0) {
            for (var i = 0; i < items.length; i++) {
                this.sumTotalQty = this.sumTotalQty + parseInt(items[i].quantity);
                this.sumPrice += items[i].price;
            }
        }

    }

    addItem() {
        var item = {};
        item.articleVariantId = '';
        this.data.items.push(item);
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
        this.makeTotal(this.data.items);
    }

    map(result) {
        return result.data.map(item => {
            return {
                _id: item.articleVariantId,
                name: item.articleVariant.name,
                articleVariant: item.articleVariant
            }
        });
    }

    sourceChanged(newValue, oldValue) {
        let sourceCode = newValue.code;
        let nama = sourceCode.split("(");
        this.service.getSource(nama[0])
            .then(storage => {
                this.dataSource = storage[0];
                this.data.items = [];
                this.sumTotalQty = 0;
                this.sumPrice = 0;
                var sourcesTemp = this.sources;
                this.sources = [];
                var index = 0;
                for (var source of sourcesTemp) {
                    if (source.name === storage[0].name) {
                        this.sources.splice(0, 0, source);
                    } else {
                        index = index + 1;
                        this.sources.splice(index, 0, source);
                    }
                }
                this.sources = this.sources.map(source => {
                    source.toString = function () {
                        return this.name;
                    }
                    return source;
                })
            })
    }
}


