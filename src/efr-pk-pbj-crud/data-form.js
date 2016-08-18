import {inject, bindable, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    destinations = [];

    variantApiUri = require('../host').core + '/articles/variants';

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
        var getDestination = [];
        this.service.getModuleConfig()
            .then(config => {
                if (config.destination.type = "selected") {
                    var getStorages = [];
                    for (var value in config.destination.value) {
                        getStorages.push(this.service.getStorageById(config.destination.value[value]));
                    }
                    Promise.all(getStorages)
                        .then(results => {
                            for (var result in results) {
                                this.destinations.push(results[result]);
                            }
                        })
                }
                Promise.all([this.service.getStorageById(config.source.value)])
                    .then(storages => {
                        var source = storages[0];
                        this.data.sourceId = source._id;
                        this.data.source = source;

                        this.inventoryApiUri = require('../host').inventory + '/storages/' + this.data.sourceId + '/inventories';
                    })
                 if (this.data._id!="")  
                {
                this.service.getById(this.data._id)
                    .then(data => {
                        var items = data.items.map(item => {
                            return {
                                _id: item.articleVariantId,
                                name: item.articleVariant.name,
                                articleVariant: item.articleVariant,
                                quantity: item.quantity
                            }
                        });
                        for (var item of items) {
                            var i = { selection: item, quantity: item.quantity };
                            this.data.items.push(i)
                        }
                    })
                }
            })
            .catch(e => {
                this.loadFailed = true;
            })
    }

    attached() {
        this.bindingEngine.collectionObserver(this.data.items)
            .subscribe(splices => {
                var item = this.data.items[splices[0].index];
                this.observeItem(item);
            });
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


}


