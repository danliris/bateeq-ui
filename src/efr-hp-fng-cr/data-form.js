import {inject, bindable, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable data = {};
    @bindable error = {};

    serviceUriStorages = require('../host').inventory + '/storages';
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

    getQuantity(item) {
        for (var finishing of item.articleVariant.finishings) {
            finishing.quantity = item.quantity * finishing.quantityEach;
        }
    }

    attached() {
        this.bindingEngine.collectionObserver(this.data.items)
            .subscribe(splices => {
                var item = this.data.items[splices[0].index];
                this.bindingEngine.propertyObserver(item, "articleVariantId").subscribe((newValue, oldValue) => {
                    var getStock = [];
                    item.quantity = 0;
                    for (var finishing of item.articleVariant.finishings) {
                        finishing.quantityEach = 0;
                        finishing.quantity = 0;
                        getStock.push(this.service.getInventory(this.data.sourceId, finishing.articleVariantId))
                    }
                    Promise.all(getStock)
                        .then(inventories => {
                            var index = 0;
                            for (var finishing of item.articleVariant.finishings) {
                                finishing.quantityStock = 0;
                                if (inventories[index])
                                    finishing.quantityStock = inventories[index].quantity;
                                index++;
                            }
                        })
                });
            });
    }

    addItem() {
        var item = {};
        item.articleVariantId = '';
        item.articleVariant = { finishings: [] };
        this.data.items.push(item);
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    addItemDetail(index) {
        var item = {};
        item.articleVariantId = '';
        if (!this.data.items[index].articleVariant.finishings) {
            this.data.items[index].articleVariant.finishings = [];
        }
        this.data.items[index].articleVariant.finishings.push(item);
    }

    removeItemDetail(index, item) {
        var itemIndex = this.data.items[index].articleVariant.finishings.indexOf(item);
        this.data.items[index].articleVariant.finishings.splice(itemIndex, 1);
    }
}
