import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List { 
    total;
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.storageId = "";
        this.filter = "";  
    }

    async activate() { 
    }

    reloadItem() { 
        this.total=0;
        this.storageId= this.storage._id;
        this.service.getAllInventory(this.storageId, this.filter)
            .then(result => {
                this.result = result;
                console.log(this.result);
                for (var item of this.result)
                {
                    this.total=this.total+item.quantity;
                }
            })
    }
    

    excel() {
        this.storageId= this.storage._id;
        this.service.generateExcel(this.storageId, this.filter)
            // .then(result => {
            //     this.result = result;
            // })
    }
    // view(data) { 
    //     this.router.navigateToRoute('view', { storageId: data.storageId, itemId: data.itemId });
    // } 
}
