import {inject, bindable, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable data = {};
    @bindable error = {};

    variantApiUri = require('../host').core + '/articles/variants';

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
        var getDestination = [];
        this.service.getModuleConfig()
            .then(config => {
                var getStorages = [this.service.getStorageById(config.source.value)];

                if (config.destination.type == "Selected") {
                    for (var destinationId of config.destination.value) {
                        getStorages.push(this.service.getStorageById(destinationId));
                    }
                }
                else {
                    getStorages.push(this.service.getStorageById(config.destination.value));
                }

                Promise.all(getStorages)
                    .then(storages => {
                        var source = storages[0];
                        this.destinations = storages.splice(1);
                        this.inventoryApiUri = require('../host').inventory + '/storages/' + source._id + '/inventories';

                        this.data.sourceId = source._id;
                        this.data.source = source;

                        for (var item of this.data.items)
                            item.selection = {
                                _id: item.articleVariantId,
                                name: item.articleVariant.name,
                                articleVariant: item.articleVariant,
                                quantity: item.quantity
                            }

                    })
            })
            .catch(e => {
                console.log(e)
                this.loadFailed = true;
            })
    }

    bind(bindingContext, overrideContext) {
        console.log('bind');
    }

    attached() {
        console.log('attached');
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
