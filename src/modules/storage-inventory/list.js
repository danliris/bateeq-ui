import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

var StorageLoader = require('../../loader/storage-loader');

@inject(Router, Service)
export class List { 
    total;
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.storageId = "";
        this.itemCode = "";
        this.filter = "";  
    }

    async activate() { 
    }

    reloadItem() { 
        this.total=0;
        this.totalharga=0;

        this.storageId= this.storages._id;
        this.filter = this.filter;
        
        this.service.getAllInventory(this.storageId, this.filter)
            .then(data => {
                this.data = data;
                for (var item of this.data)
                {
                    item.subtotale=item.Quantity*item.ItemDomesticSale;
                    this.total=this.total+item.Quantity;
                    this.totalharga=this.totalharga+item.subtotale;
                }
            })
    }

    excel() {
        this.storageId = this.storages.code; //soon
        this.service.generateExcel(this.storageId, this.filter)
            // .then(data => {
            //     this.data = data;
            // })
    }

    view(data) { 
        this.router.navigateToRoute('view', { storageId: data.StorageId, itemCode: data.ItemCode });
    } 

    get storage() {
        return StorageLoader;
    }
}
