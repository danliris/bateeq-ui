import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};

    storageApiUri = require('../host').inventory + '/storages';
    variantApiUri = require('../host').core + '/articles/variants';

    constructor(router, service) {
        this.router = router;
        this.service = service;

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
    }

    search() {
    }

    addItem() {
        var item = {};
        item.articleVariantId = '';
        item.articleVariant = { _id: '', name: '' };
        item.articleVariant.finishings = [];
        this.data.items.push(item);
        console.log(JSON.stringify(this.data));
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    addItemDetail(index) { 
        var item = { articleVariantId: '', articleVariant: { _id: '', name: '' } };
        item.articleVariantId = '';
        if (!this.data.items[index].articleVariant) {
            this.data.items[index].articleVariant = { _id: '', name: '' };
        }
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
