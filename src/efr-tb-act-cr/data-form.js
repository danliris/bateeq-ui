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
                        getStorages.push(this.service.getSupplierById(sourceId.toString()));
                        indexSource++;
                    }
                }
                else {
                    getStorages.push(this.service.getSupplierById(config.source.value.toString()));
                    indexSource++
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
                        this.sources = storages.splice(0, indexSource);
                        this.destinations = storages[0];
                        this.data.sourceId = this.sources[0]._id;
                        this.data.source = this.sources[0];
                        this.data.destinationId = this.destinations._id;
                        this.data.destination = this.destinations;
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
        this.data.items.push(item);
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
}
