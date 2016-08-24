import {inject, bindable, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable data = {};
    @bindable error = {};

    storageApiUri = require('../host').inventory + '/storages';
    variantApiUri = require('../host').core + '/articles/variants';

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;

        this.service.getModuleConfig()
            .then(config => {
                var getStorages = [];
                var indexSource = 0;
                if (config.source.type == "selection") {
                    for (var sourceId of config.source.value) {
                        getStorages.push(this.service.getStorageById(sourceId.toString()));
                        indexSource++;
                    }
                }
                else {
                    getStorages.push(this.service.getStorageById(config.source.value.toString()));
                    indexSource++;
                }
                if (config.destination.type == "selection") {
                    for (var destinationId of config.destination.value) {
                        getStorages.push(this.service.getStorageById(destinationId.toString()));
                    }
                }
                else {
                    getStorages.push(this.service.getStorageById(config.destination.value.toString()));
                }
                Promise.all(getStorages)
                    .then(storages => {
                        this.sources = storages.splice(0, indexSource);
                        this.data.sourceId = this.sources[0]._id;
                        this.data.source = this.sources[0];
                        this.destinations = storages.splice(0);
                        this.data.destinationId = this.destinations[0]._id;
                        this.data.destination = this.destinations[0];
                    })
            })
            .catch(e => {
                console.log(e)
                this.loadFailed = true;
            })
    }

    attached() {
        // this.bindingEngine.collectionObserver(this.data.items)
        //     .subscribe(splices => { 
        //         for (var item of this.data.items) {
        //             this.bindingEngine.propertyObserver(item, "articleVariantNewId").subscribe((newValue, oldValue) => {
        //                 item.quantityStock = 0;
        //                 this.service.getInventory(this.data.sourceId, item.articleVariantNewId)
        //                     .then(inventory => {
        //                         if (inventory)
        //                             item.quantityStock = inventory.quantity;
        //                     })
        //             });
        //         }  
        //     });
    }

    addItem() {
        var item = {};
        item.articleVariantId = '';
        this.data.items.push(item);
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    search() {
        this.service.getEFRKBRTFByCode(this.data.reference)
            .then(dataOut => {
                var getStock = [];
                var dataOutFirst = dataOut[0];
                //this.data.sourceId = dataOutFirst.sourceId
                //this.data.destinationId = dataOutFirst.destinationId
                this.data.items.splice(0);
                for (var obj of dataOutFirst.items) {
                    var item = {};
                    item.articleVariantNewId = "";
                    item.articleVariantNew = {};
                    item.articleVariantId = obj.articleVariantId;
                    item.articleVariant = obj.articleVariant;
                    item.quantityOut = obj.quantity;
                    item.quantity = obj.quantity;
                    item.remark = obj.remark;
                    this.BindingItemVariantNewID(item);
                    this.data.items.push(item);
                    getStock.push(this.service.getInventory(this.data.sourceId, item.articleVariantId))
                }
                Promise.all(getStock)
                    .then(inventories => {
                        var index = 0;
                        for (var item of this.data.items) {
                            item.quantityStock = 0;
                            if (inventories[index])
                                item.quantityStock = inventories[index].quantity;
                            index++;
                        }
                    })
            })
            .catch(e => {
                alert('Referensi Keluar tidak ditemukan');
            })
    }

    BindingItemVariantNewID(item) {
        this.bindingEngine.propertyObserver(item, "articleVariantNewId").subscribe((newValue, oldValue) => {
            item.quantityStock = 0;
            console.log(this.data.sourceId);
            console.log(item.articleVariantNewId);
            this.service.getInventory(this.data.sourceId, item.articleVariantNewId)
                .then(inventory => {
                    if (inventory)
                        item.quantityStock = inventory.quantity;
                })
        });

    }

}