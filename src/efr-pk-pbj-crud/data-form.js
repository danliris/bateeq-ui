import {inject, bindable, ObserverLocator} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service'; 


@inject(Router, Service)
@inject(ObserverLocator)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    storages = [];
    @bindable quantity = 0;
    sources = [];
    destinations = [];
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    attached() { 
        this.service.getByCode("EFR-PK/PBJ")
            .then(data => {
                var dataOutFirst = data[0];
                var id = dataOutFirst.config.source.value;
                if(dataOutFirst.config.source.type = "fix"){
                     this.service.getAllStorageById(id)
                        .then(dataStorage => {
                            this.data.sourceId = dataStorage._id;
                            this.data.source = dataStorage.name;
                        })
                }
               
               if(dataOutFirst.config.destination.type = "selected"){
                    var getStorages = [];
                    for(var value in dataOutFirst.config.destination.value){
                        getStorages.push(this.service.getAllStorageById(dataOutFirst.config.destination.value[value]));
                    }
                    Promise.all(getStorages)
                        .then(results => {
                            for(var result in results){
                                this.destinations.push(results[result]); 
                            }  
                        }) 
                } 
           
            })
            .catch(e => {
                alert('Fill Configuration in Module');
            }) 
    }

    detached() {
        $(this.element).datepicker('destroy')
            .off('change');
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
    onloadeddata()
    {
        getQty(this.data.item.articleVariantId);
    }
}


