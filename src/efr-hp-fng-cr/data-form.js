import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
 
@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    storages = [];
    
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
        console.log(JSON.stringify(this.data));
    } 
    
    removeItem(item) { 
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
        console.log(JSON.stringify(this.data));
    }
    
    addItemDetail(index) {           
        var item = {};
        item.articleVariantId = ''; 
        if(!this.data.items[index].articleVariant.finishings){
            console.log(1);
            this.data.items[index].articleVariant.finishings= [];
        }  
        this.data.items[index].articleVariant.finishings.push(item); 
        console.log(JSON.stringify(this.data));
    } 
    
    removeItemDetail(index, item) { 
        var itemIndex = this.data.items[index].articleVariant.finishings.indexOf(item);
        this.data.items[index].articleVariant.finishings.splice(itemIndex, 1);
        console.log(JSON.stringify(this.data));
    }
}
 