import {inject, bindable, ObserverLocator} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service'; 


@inject(Router, Service)
@inject(ObserverLocator)
export class DataForm {
    @bindable data = {};
    @bindable error = {}; 
    @bindable quantity = 0; 
    
    variantApiUri = require('../host').core + '/articles/variants';
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
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
                    })
            })
            .catch(e=>{
                this.loadFailed = true;
            })
    }

    attached() {  
    }

    
    getQty(id) {
        this.service.getDataByIdVariant(id)
            .then(data => {
                var dataOutFirst = data;
                this.quantity = dataOutFirst.quantity;
            })
            .catch(e => {
                this.quantity = 0;
            })
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
        this.service.getOutByCode(this.data.reference)
            .then(dataOut => {
                var dataOutFirst = dataOut[0];
                this.data.sourceId = dataOutFirst.config.source.value
            })
            .catch(e => {
                alert('Referensi Keluar tidak ditemukan');
            })
    }  
}


