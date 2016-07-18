import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create { 
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { items: [] }; 
        this.storages=[];  
    } 
    
    activate() {    
        this.service.getAllStorage() 
            .then(storages => {
                this.storages = storages;
            })  
    }
     
    list() {
        this.router.navigateToRoute('list');
    }
    
    addItem() {          
        var transferOutItem = require('bateeq-models').inventory.TransferOutItem;
        var item = new transferOutItem();
        item.articleVariantId = '';
        this.data.items.push(item); 
    }
    
    deleteItem(index) {       
        console.log(this.data.items[index]);
        
        var i = this.data.items.indexOf(this.data.items[index]);
        if(i != -1) {
            this.data.items.splice(i, 1);
        } 
    }
    
    save() {
        console.log(JSON.stringify(this.data));
        this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                console.warn(e);
            })
    }
}
