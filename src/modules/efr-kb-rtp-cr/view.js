import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.service.getById(id)
            .then(data => {
                this.data = data;
                this.totalQuantity = 0;
                this.totalPrice = 0;
                for (var item of this.data.items) {
                    item.totalPrice = parseInt(item.quantity * item.item.domesticSale);
                    this.totalQuantity += parseInt(item.quantity);
                    this.totalPrice += item.totalPrice;
                }
                
                this.data._createdDate = moment(data._createdDate).format("DD MMM YYYY HH:mm:ss");
                console.log(this.data._createdDate);
                this.service.getSPKByReference(this.data.code).then(spk => {
                    this.data.spk = spk;
                })
            })
    }

    list() {
        this.router.navigateToRoute('list');
    }

    print() {
        window.print();
    }

    exportToExcel() {
        this.service.generateExcel(this.data._id);
    }
}
