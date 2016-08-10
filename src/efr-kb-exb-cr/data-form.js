import {inject, bindable, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    storages = [];
    serviceUriStorages = require('../host').inventory + '/storages';
    serviceUriMerchandiser = require('../host').merchandiser + '/docs/efr-pk'; 

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
    }
    
    attached() {
        this.bindingEngine.collectionObserver(this.data.spkDocuments)
            .subscribe(splices => {
                var spk = this.data.spkDocuments[splices[0].index]; 
                this.bindingEngine.propertyObserver(spk, "spkDocumentId").subscribe((newValue, oldValue) => {
                    // console.log(`value changed from ${oldValue} to ${newValue}`);
                    // console.log(JSON.stringify(spk));
                    spk.quantity = 0;
                    for(var item of spk.spkDocument.items) {
                        spk.quantity = spk.quantity + parseInt(item.quantity);
                    }
                });
                // console.log(splices);
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