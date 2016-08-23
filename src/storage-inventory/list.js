import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.storageId = "";
        this.storages = [];
        this.filter = "";
        //this.data = {};
    }

    activate() { 
        this.service.getAllStorage() 
            .then(storages => {
                this.storages = storages; 
            })  
    }
    
    reloadArticleVariant() { 
        this.service.getAllInventory(this.storageId, this.filter) 
            .then(data => {
                this.data = data;  
            })  
    } 
    
    view(data) {
        console.log(JSON.stringify(data));
        this.router.navigateToRoute('view', { storageId: data.storageId, articleVariantId: data.articleVariantId });
    }   
    
}
