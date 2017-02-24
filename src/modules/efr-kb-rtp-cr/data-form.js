import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service'; 

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    sources = [];
    destinations = [];
    item;
    barcode;
    qtyFg;
    indexSource = 0;
    hasFocus = false;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

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

    // itemChanged(e, item) {
    //     var itemData = e.detail;
    //     if (itemData) {
    //         item.itemId = itemData._id;
    //         item.availableQuantity = 0;
    //         this.service.getDataInventory(this.data.source._id, item.itemId)
    //             .then(inventoryData => {
    //                 if (inventoryData) {
    //                     item.availableQuantity = inventoryData.quantity;
    //                 }
    //             })
    //     }
    // } 

    async barcodeChoose(e) {
        var itemData = e.srcElement.defaultValue;
        if (itemData && itemData.length >= 13) {
            var fgTemp = await this.service.getByCode(itemData);
            if (fgTemp != undefined) {
                if (Object.getOwnPropertyNames(fgTemp).length > 0) {
                    var fg = fgTemp[0];
                    if (fg != undefined && Object.getOwnPropertyNames(fg).length > 0) {
                        var newItem = {};
                        var _data = this.data.items.find((item) => item.code === fg.code);
                        if (!_data) {
                            this.qtyFg = 0;
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
                            newItem.remark = "";
                            this.data.items.push(newItem);
                        } else {
                            this.qtyFg = this.qtyFg + 1;
                            _data.quantity = this.qtyFg;
                        }
                        this.barcode = "";
                    }
                }
            }
        }

    }



    async nameChoose(e) {
        var itemData = e;
        // console.log(itemData);
        // e.detail = null;
        // console.log(itemData);
        if (itemData != undefined) {
            if (Object.getOwnPropertyNames(itemData).length > 0) {
                var newItem = {};
                var _data = this.data.items.find((item) => item.code === itemData.code);
                if (!_data) {
                    this.qtyFg = 0;
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
                    newItem.remark = "";
                    // console.log(this.item);
                    this.data.items.push(newItem);

                } else if (_data && _data != undefined) {
                    // console.log(this.item);
                    this.item = {};

                    // this.qtyFg = this.qtyFg + 1;
                    // _data.quantity = this.qtyFg;
                    // this.barcode.hasFocus = true;
                }
                this.item = null;
            }
        }

    }

    addItem() {
        var newItem = {};
        newItem.itemId = "";
        newItem.item = {};
        newItem.availableQuantity = 0;
        newItem.quantity = 0;
        newItem.remark = "";
        this.data.items.push(newItem);
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    async attached() {
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

    search() {
    }
}
