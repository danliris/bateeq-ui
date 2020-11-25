import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import { Dialog } from '../../au-components/dialog/dialog';

@inject(Router, Dialog, Service)
export class View {
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;
    
    constructor(router, dialog, service) {
        this.router = router;
        this.dialog = dialog;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        // this.data = {
        //     id: 1,
        //     voucherType: 'Percentage',
        //     percentage: 10,
        //     maxDiscount: 10000,
        //     nominal: 10000,
        //     minimumPayment: 10000,
        //     appliesMultiply: true,
        //     qtyItemPruchase: 10,
        //     qtyItemGift: 1,
        //     productPurchase: 'Baju A',
        //     productGift: 'Baju B',
        //     assignToCategory: 'Man',
        //     categoryPurchase: 'Man',
        //     discountPercentage: 10,
        //     discountName: 'Batik Day',
        //     discountCode: 'BatikDay',
        //     discountType: 'Percentage',
        //     totalUse: 30,
        //     status: 'Active',
        //     quantityVoucher: 100,
        //     maxUsagePerUser: 2,
        //     startDate: '03-10-2020',
        //     endDate: '03-11-2020',
        //     description: 'description vocher'
        // }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', {id: this.data.id});
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
