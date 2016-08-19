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

    attached() {
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
                var dataOutFirst = dataOut[0];
                //this.data.sourceId = dataOutFirst.sourceId
                //this.data.destinationId = dataOutFirst.destinationId
                this.data.items = [];
                for (var obj of dataOutFirst.items) {
                    var item = {};
                    item.articleVariantId = obj.articleVariantId;
                    item.articleVariant = obj.articleVariant;
                    item.quantityOut = obj.quantity;
                    item.quantity = obj.quantity;
                    item.remark = obj.remark;
                    this.data.items.push(item);
                }
            })
            .catch(e => {
                alert('Referensi Keluar tidak ditemukan');
            })
    }
}