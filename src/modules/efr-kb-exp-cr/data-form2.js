import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable data = {};
    @bindable error = {};

    // serviceUriStorages = require('../../host').inventory + '/storages';
    // serviceUriMerchandiser = require('../../host').merchandiser + '/docs/efr-pk/pending';

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;

        this.service.getModuleConfig()
            .then(config => {
                var getStorages = [];
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
                        this.destinations = storages.splice(0);
                        this.data.destinationId = this.destinations[0]._id;
                        this.data.destination = this.destinations[0];
                    })
            })
            .catch(e => {
                this.loadFailed = true;
            })
    }

    attached() {
        this.bindingEngine.collectionObserver(this.data.spkDocuments)
            .subscribe(splices => {
                var spk = this.data.spkDocuments[splices[0].index];
                this.bindingEngine.propertyObserver(spk, "spkDocumentId").subscribe((newValue, oldValue) => {
                    spk.quantity = 0;
                    spk.quantity = spk.items.reduce((sum, curr) => sum + parseInt(curr.quantity), 0);
                });
            });
    }

    addSpkDocument() {
        var spkDocument = {};
        spkDocument.spkDocumentId = '';
        if (!this.data.spkDocuments) {
            this.data.spkDocuments = [];
        }
        this.data.spkDocuments.push(spkDocument);
    }

    removeSpkDocument(spkDocument) {
        var spkDocumentIndex = this.data.spkDocuments.indexOf(spkDocument);
        this.data.spkDocuments.splice(spkDocumentIndex, 1);
    }

}