import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, ServiceMembership } from './service';
// import { activationStrategy } from 'aurelia-router';
import moment from "moment";
// import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, ServiceMembership)
export class Create {
    hasCancel = true;
    hasSave = true;

    assignToMembership = [];

    productGift = [];

    constructor(router, service, serviceMembership) {
        this.router = router;
        this.service = service;
        this.serviceMembership = serviceMembership;
    }

    async activate(params) {
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
    }

    bind() {
        this.data = {};
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    save(event) {
        this.data.assignToMembershipIds = this.assignToMembership.filter(x => x.checked).map(x => x.value).join(',');
        this.data.startDate = moment(this.data.startDate).format("DD/MM/YYYY");
        this.data.endDate = moment(this.data.endDate).format("DD/MM/YYYY");

        if (this.data.voucherType.toLowerCase() == "product") {
            this.data.productGift = this.productGift.map(x => x.id).join(',');
            delete this.data.nominal;
        }

        this.service.create(this.data)
            .then(result => {
                this.router.navigateToRoute('list');
                alert("Data Saved");
            })
            .catch(e => {
                this.error = e.message;
            });
    }
}