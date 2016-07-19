import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
 
@inject(Router, Service)
export class DataForm { 
    @bindable data = {};
    storages = [];
    
    constructor(router, service) { 
        this.router = router;
        this.service = service;  
    }
     
    attached() {    
        this.service.getAllStorage() 
            .then(storages => {
                this.storages = storages;
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
