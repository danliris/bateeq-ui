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

                var getStoragesDestination = [];
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
                        this.sources = storages.splice(0, storages.length - indexSource);
                        this.destinations = storages.splice(0);
                        this.data.sourceId = this.sources[0]._id;
                        this.data.source = this.sources[0];
                        this.data.destinationId = this.destinations[0]._id;
                        this.data.destination = this.destinations[0]; 

                        this.inventoryApiUri = require('../host').inventory + '/storages/' + this.data.sourceId + '/inventories';

                        for (var item of this.data.items)
                            item.selection = {
                                _id: item.articleVariantId,
                                name: item.articleVariant.name,
                                articleVariant: item.articleVariant,
                                quantity: item.quantity
                            }
                        for (var item of this.data.items) {
                            this.service.getDataInventory(this.data.sourceId, item.articleVariantId)
                                .then(inventoryData => {
                                    item.availableQuantity = inventoryData.quantity; 
                                })
                        }

                    })
            })
            .catch(e => { 
                this.loadFailed = true;
            })
    }

    attached() { 
    }

    detached() {

        console.log(this.data.source._id);
    }

    observeItem(item) {
        this.bindingEngine.propertyObserver(item, "selection").subscribe((newValue, oldValue) => {
            item.articleVariantId = newValue._id;
            item.articleVariant = newValue.articleVariant;
            item.availableQuantity = newValue.availableQuantity;
        });
    }

    addItem() {
        var item = {};
        item.articleVariantId = '';
        this.data.items.push(item);
         this.bindingEngine.collectionObserver(this.data.items)
            .subscribe(splices => {
                var item = this.data.items[splices[0].index];
                this.observeItem(item);
            });
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    map(result) {
        return result.data.map(item => {
            return {
                _id: item.articleVariantId,
                name: item.articleVariant.name,
                articleVariant: item.articleVariant,
                availableQuantity: item.quantity
            }
        });
    }

    selectionSource() {
        this.inventoryApiUri = require('../host').inventory + '/storages/' + this.data.sourceId + '/inventories'; 
        this.data.items = [];
        this.attached();
    }
}