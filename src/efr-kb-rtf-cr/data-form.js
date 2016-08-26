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
            .catch(e => {
                this.loadFailed = true;
            })  
    }
     
    attached() {    
    }  
    
    removeItem(item) { 
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
    
    search() {  
        this.service.getEFRKBRTPByCode(this.data.reference)
              .then(dataOut => {
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
