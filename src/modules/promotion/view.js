import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, ServiceProduct } from './service';
import { Dialog } from '../../au-components/dialog/dialog';

@inject(Router, Dialog, Service, ServiceProduct)
export class View {
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;

    constructor(router, dialog, service, serviceProduct) {
        this.router = router;
        this.dialog = dialog;
        this.service = service;
        this.serviceProduct = serviceProduct;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
      
        // if (this.data) {
        //     let productIds = []
        //     if (this.data.productGift) productIds.push(this.data.productGift)
        //     if (this.data.productPurchase) productIds.push(this.data.productPurchase)
            
        //     let product = await this.serviceProduct.getProductByIds(productIds)

        //     this.data.productGift = product.find(x => x.id == this.data.productGift)
        //     this.data.productPurchase = product.find(x => x.id == this.data.productPurchase)
        // }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    delete(event) {
        this.dialog.prompt('Are you sure want to delete this voucher?', 'Delete this voucher')
            .then(response => {
                if (response.ok) {
                    console.log(event)
                    this.service.delete(this.data.id)
                        .then(result => {
                            this.list();
                        });
                    this.router.navigateToRoute('list');
                }
            });
    }
}
