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
    }
     
    attached() {    
        
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
