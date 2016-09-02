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
               // var indexSource = 0;

                // if (config.source.type == "selection") {
                //     for (var sourceId of config.source.value) {
                //         getStorages.push(this.service.getStorageById(sourceId.toString()));
                //         indexSource++;
                //     }
                // }
                // else {
                //     getStorages.push(this.service.getStorageById(config.source.value.toString()));
                //     indexSource++
                // }

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
                        //this.sources = storages.splice(0, indexSource);
                        this.destinations = storages.splice(0);
                        //this.data.sourceId = this.sources[0]._id;
                        //this.data.source = this.sources[0];
                        this.data.destinationId = this.destinations[0]._id;
                        this.data.destination = this.destinations[0];
                    })
            })
            .catch(e => {
                console.log(e)
                this.loadFailed = true;
            })
    }
    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    attached() {

    }

    search() {
        this.service.getSPKByPackingList(this.data.reference)
            .then(dataOut => {
                this.data.sourceId = dataOut[0].destinationId;
                this.data.source = dataOut[0].destination;
                var promises = [];
                for (var variant of dataOut[0].items) {
                    var p = new Promise((resolve, reject) => {
                        var item = {};
                        item.articleVariantId = variant.articleVariantId;
                        item.articleVariant = variant.articleVariant;
                        item.quantity = variant.quantity;
                        item.remark = variant.remark;
                        this.service.getDataInventory(this.data.sourceId, item.articleVariantId)
                            .then(inventoryData => {
                                item.availableQuantity = inventoryData.quantity;
                                resolve(item);
                            })
                    })
                    promises.push(p);
                }

                Promise.all(promises)
                    .then(items => {
                        this.data.items = items;
                    })
            })
            .catch(e => {
                alert('Referensi tidak ditemukan');
            })
    }
}
