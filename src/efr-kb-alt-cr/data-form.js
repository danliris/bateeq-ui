import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    storages = [];
    serviceUriStorages = require('../host').inventory + '/storages';

    
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
                var promises = [];
                var dataOutFirst = dataOut[0];
                this.data.items = [];   
                for(var obj of dataOutFirst.items) {  
                   var p = new Promise((resolve, reject) => {
                       var item = {};
                       item.articleVariantId = obj.articleVariantId;
                       item.articleVariant = obj.articleVariant;
                       item.quantity = obj.quantity;
                       item.remark = obj.remark;
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
        .catch(e=> { 
            alert('Referensi Keluar tidak ditemukan');
        }) 
    } 


    removeItem(item) { 
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
        console.log(JSON.stringify(this.data));
    }

}