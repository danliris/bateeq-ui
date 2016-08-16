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
    
    search() {   
    } 
    
    addItem() {           
        var item = {};
        item.articleVariantId = ''; 
        item.articleVariant = {};
        item.articleVariant.finishings = [];
        this.data.items.push(item);  
        console.log(JSON.stringify(this.data));    
    } 
    
    removeItem(item) { 
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1); 
    }
    
    addItemDetail(index) {    
        console.log(JSON.stringify(this.data));       
        var item = {};
        item.articleVariantId = ''; 
        if(!this.data.items[index].articleVariant){ 
            this.data.items[index].articleVariant = {};
        }  
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
 