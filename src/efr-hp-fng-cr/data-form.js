import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};

    serviceUriStorages = require('../host').inventory + '/storages';
    variantApiUri = require('../host').core + '/articles/variants';

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.service.getModuleConfig()
            .then(config => {
                var getStorages = [];
                var indexSource = 0;
                if (config.source.type == "Selection") {
                    for (var sourceId of config.source.value) {
                        getStorages.push(this.service.getStorageById(sourceId));
                        indexSource++;
                    }
                }
                else {
                    getStorages.push(this.service.getStorageById(config.source.value));
                    indexSource++;
                }
                if (config.destination.type == "Selection") {
                    for (var destinationId of config.destination.value) {
                        getStorages.push(this.service.getStorageById(destinationId));
                    }
                }
                else {
                    getStorages.push(this.service.getStorageById(config.destination.value));
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
