import {inject, bindable, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    
    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.service.getModuleConfig()
            .then(config => {
                var getStorages = [];
                var indexSource = 0;
                if (config.source.type && config.source.type == "selection") {
                    for (var sourceId of config.source.value) {
                        getStorages.push(this.service.getStorageById(sourceId.toString()));
                        indexSource++;
                    }
                }
                else {
                    if (config.source.value) {
                        getStorages.push(this.service.getStorageById(config.source.value.toString()));
                        indexSource++
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

                Promise.all(getStorages)
                    .then(storages => {
                        this.sources = storages.splice(0, indexSource);
                        this.destinations = storages.splice(0);
                        this.data.sourceId = this.sources[0]._id;
                        this.data.source = this.sources[0];
                        this.data.destinationId = this.destinations[0]._id;
                        this.data.destination = this.destinations[0];
                    })
            })
            .catch(e => {
                console.log(e);
                this.loadFailed = true;
            })
    }

    itemChanged(e, item) {
        var itemData = e.detail;
        if (itemData) {
            item.itemId = itemData._id;
            item.availableQuantity = 0;
            this.service.getDataInventory(this.data.sourceId, item.itemId)
                .then(inventoryData => {
                    if (inventoryData) {
                        item.availableQuantity = inventoryData.quantity;
                    }
                })
                .catch(e => {
                    console.log(e);
                })
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

    attached() {
        this.bindingEngine.propertyObserver(this.data, "sourceId").subscribe((newValue, oldValue) => {
            var getDatas = [];
            for (var item of this.data.items) {
                item.availableQuantity = 0;
                getDatas.push(this.service.getDataInventory(this.data.sourceId, item.itemId))
            }
            Promise.all(getDatas)
                .then(inventoryDatas => {
                    for (var item of this.data.items) {
                        var index = this.data.items.indexOf(item);
                        console.log(inventoryDatas[index]);
                        if (inventoryDatas[index]) {
                            item.availableQuantity = inventoryDatas[index].quantity;
                        }
                    }
                })
        });
    }

    search() {
        this.service.getSPKByPackingList(this.data.reference)
            .then(dataOut => {
                this.data.sourceId = dataOut[0].destinationId;
                this.data.source = dataOut[0].destination;
                var promises = [];
                for (var itemData of dataOut[0].items) {
                    var p = new Promise((resolve, reject) => {
                        var item = {};
                        item.itemId = itemData.itemId;
                        item.item = itemData.item;
                        item.quantity = itemData.quantity;
                        item.remark = itemData.remark;
                        this.service.getDataInventory(this.data.sourceId, item.itemId)
                            .then(inventoryData => {
                                item.availableQuantity = inventoryData.quantity;
                                resolve(item);
                            })
                    })
                    promises.push(p);
                }

                Promise.all(promises)
                    .then(items => {
                        this.data.items = items;
                    })
            })
            .catch(e => {
                alert('Referensi tidak ditemukan');
            })
    }
}
