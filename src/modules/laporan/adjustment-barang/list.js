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
        // this.filter = "";  
    }

    async activate() {
    }

    reloadItem() {
        this.total = 0;
        this.storageId = this.storage ? this.storage._id : "";

        this.service.getAdjustmentByStorageId(this.storageId)

            .then(result => {
                this.data = [];
                for (var data of result) {
                    for (var item of data.items) {
                        item._createdDate = data._createdDate;
                        item.storageName = data.storage.name;
                        this.total = this.total + item.qtyAdjustment;
                        this.data.push(item);
                    }
                }
            })
    }

    // view(data) { 
    //     this.router.navigateToRoute('view', { storageId: data.storageId, itemId: data.itemId });
    // } 
}
