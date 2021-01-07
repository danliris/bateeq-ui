import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, ServiceMembership, ServiceProduct } from './service';
import { Dialog } from '../../au-components/dialog/dialog';

@inject(Router, Dialog, Service, ServiceMembership, ServiceProduct)
export class View {
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;
    isProduct = false;

    productGift = [];

    assignToMembership = [];

    constructor(router, dialog, service, serviceMembership, serviceProduct) {
        this.router = router;
        this.dialog = dialog;
        this.service = service;
        this.serviceMembership = serviceMembership;
        this.serviceProduct = serviceProduct;
    }

    async activate(params) {
        let id = params.id;

        this.data = await this.service.getById(id);
        this.voucherType = this.data.voucherType;

        await this.serviceMembership.getListMembership({})
            .then(result => {
                this.assignToMembership = result.map(s => {
                    return {
                        label: s.name,
                        value: s.id,
                        checked: false
                    }
                });
            });

        if (this.data.voucherType.toLowerCase() == 'product' && this.data.productGift.length > 0) {
            this.isProduct = true;
            this.productGift = await this.serviceProduct.getProductByIds(this.data.productGift[0].split(","))
                .then(result => {
                    return result.map(x => {
                        return {
                            id: x.id,
                            name: x.name
                        }
                    })
                });
        }

        if (this.data.assignToMember && this.data.assignToMember.length > 0)
            this.assignToMembership = this.assignToMembership.map(x => {
                if (this.data.assignToMember[0].split(',').find(y => y == x.value))
                    x.checked = true
                return x
            })
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
                    this.service.delete(this.data.id)
                        .then(result => {
                            this.list();
                        });
                    this.router.navigateToRoute('list');
                }
            });
    }
}
