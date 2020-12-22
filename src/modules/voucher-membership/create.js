import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
// import { activationStrategy } from 'aurelia-router';
import moment from "moment";
// import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate(params) {
    }

    bind() {
        this.data = {};
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    save(event) {
        this.data.assignToMembershipIds = this.data.assignToMembershipIds.filter(x => x.checked).map(x => x.value).join(',');
        this.data.startDate = moment(this.data.startDate).format("DD/MM/YYYY");
        this.data.endDate = moment(this.data.endDate).format("DD/MM/YYYY");

        if (this.data.voucherType.toLowerCase() == "product") {
            this.data.productGift = this.data.productGift.map(x => x.id).join(',');
            delete this.data.nominal;
        }

        this.service.create(this.data)
            .then(result => {
                console.log(result);
                alert("Data Saved");
            })
            .catch(e => {
                this.error = e.message;
            });
    }
}