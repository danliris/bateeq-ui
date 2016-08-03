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

    attached() {     
    } 
    
    search() {  
        this.service.getOutByCode(this.data.reference)
            .then(dataOut=>{ 
                var dataOutFirst = dataOut[0];
                this.data.sourceId = dataOutFirst.sourceId
                this.data.destinationId = dataOutFirst.destinationId
                this.data.items = [];   
                for(var obj of dataOutFirst.items) {  
                    var item = {};
                    item.articleVariantId = obj.articleVariantId;
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
 