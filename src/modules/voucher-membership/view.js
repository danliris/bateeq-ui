import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, ServiceMembership } from './service';
import { Dialog } from '../../au-components/dialog/dialog';

@inject(Router, Dialog, Service, ServiceMembership)
export class View {
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;
    isProduct = false;

    productGift = [];

    assignToMembership = [];

    constructor(router, dialog, service, serviceMembership) {
        this.router = router;
        this.dialog = dialog;
        this.service = service;
        this.serviceMembership = serviceMembership;
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
            this.productGift = this.data.productGift[0].split(',').map(x => {
                return {
                    id: x,
                    name: x
                }
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
                    console.log(event)
                    this.service.delete(this.data.id)
                        .then(result => {
                            this.list();
                        });
                    this.router.navigateToRoute('list');
                }
            });
    }

    // editCallback(event) {
    //     // this.router.navigateToRoute('edit', { id: this.data.Id });
    //     this.router.navigateToRoute('edit');
    // }

    // deleteCallback(event) {
    //     this.service.delete(this.data)
    //         .then(result => {
    //             this.list();
    //         });
    // }
}
