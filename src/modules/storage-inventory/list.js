import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List { 
    total=0;
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.storageId = "";
        this.filter = "";  
    }

    async activate() { 
    }

    reloadItem() { 
        this.storageId= this.storage._id;
        this.service.getAllInventory(this.storageId, this.filter)
            .then(data => {
                this.data = data;
                for (var item of this.data)
                {
                    this.total=this.total+item.quantity;
                }
            })
    }

    view(data) { 
        this.router.navigateToRoute('view', { storageId: data.storageId, itemId: data.itemId });
    } 
}
