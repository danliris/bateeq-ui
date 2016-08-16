import {inject, bindable, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {RestService} from '../rest-service';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    @bindable quantity = 0;

    storageApiUri = require('../host').inventory + '/storages';
    variantApiUri = require('../host').core + '/articles/variants';

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;

        this.service.getModuleConfig()
            .then(config => {
                Promise.all([this.service.getStorageById(config.source.value), this.service.getStorageById(config.destination.value)])
                    .then(storages => {
                        var source = storages[0];
                        var destination = storages[1];
                        this.data.sourceId = source._id;
                        this.data.source = source;
                        this.data.destinationId = destination._id;
                        this.data.destination = destination;

                        this.inventoryApiUri = require('../host').inventory + '/storages/' + this.data.sourceId + '/inventories';
                    })
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

    search() {
        this.service.getEFRHPFNGByCode(this.data.reference)
            .then(dataOut => {
                var items = dataOut[0].transferInDocument.items.map(item => {
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
            .catch(e => {
                alert('Referensi Keluar tidak ditemukan');
            });
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
