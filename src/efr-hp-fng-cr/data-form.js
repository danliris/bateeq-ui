import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
 
@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {}; 
    
    serviceUriStorages = require('../host').inventory + '/storages';
    variantApiUri = require('../host').core + '/articles/variants';
    
    constructor(router, service) { 
        this.router = router;
        this.service = service;   
    }

    getQuantity(item) { 
        for(var finishing of item.articleVariant.finishings) {
            finishing.quantity = item.quantity * finishing.quantityEach;
        }
    }
    
    attached() {     
    }  
    
    addItem() {           
        var item = {};
        item.articleVariantId = ''; 
        item.articleVariant = { finishings: [] };
        this.data.items.push(item); 
    } 
    
    removeItem(item) { 
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
    
    addItemDetail(index) {           
        var item = {};
        item.articleVariantId = ''; 
        if(!this.data.items[index].articleVariant.finishings){ 
            this.data.items[index].articleVariant.finishings= [];
        }  
        this.data.items[index].articleVariant.finishings.push(item); 
    } 
    
    removeItemDetail(index, item) { 
        var itemIndex = this.data.items[index].articleVariant.finishings.indexOf(item);
        this.data.items[index].articleVariant.finishings.splice(itemIndex, 1);
    }
}
 