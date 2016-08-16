import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    storages = [];
    serviceUriStorages = require('../host').inventory + '/storages';
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

    
  search() {  
        this.service.getTransferInByCode(this.data.reference)
            .then(dataOut=>{ 
                var dataOutFirst = dataOut[0];
                this.data._id = dataOutFirst._id;
                this.data.items = [];   
                for(var obj of dataOutFirst.items) {  
                    var item = {};
                    item.articleVariantId = obj.articleVariantId;
                    item.articleVariant = obj.articleVariant;
                    item.quantityOut = obj.quantity;
                    item.quantity = obj.quantity;
                    item.remark = obj.remark;
                    this.data.items.push(item); 
                }   
        })
        .catch(e=> { 
            alert('Referensi Keluar tidak ditemukan');
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


}