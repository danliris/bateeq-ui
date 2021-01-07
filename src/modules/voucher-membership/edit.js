import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, ServiceMembership, ServiceProduct } from './service';
import moment from "moment";

@inject(Router, Service, ServiceMembership, ServiceProduct)
export class Edit {
    hasCancel = true;
    hasSave = true;
    isEdit = true;

    constructor(router, service, serviceMembership, serviceProduct) {
        this.router = router;
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

        if (this.data.assignToMember && this.data.assignToMember.length > 0) {
            this.assignToMembership = this.assignToMembership.map(x => {
                if (this.data.assignToMember[0].split(',').find(y => y == x.value))
                    x.checked = true
                return x
            })
        }

        delete this.data.productGift;
        delete this.data.assignToMember;
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save(event) {
        this.data.assignToMembershipIds = this.assignToMembership.filter(x => x.checked).map(x => x.value).join(',');
        this.data.startDate = moment(this.data.startDate).format("DD/MM/YYYY");
        this.data.endDate = moment(this.data.endDate).format("DD/MM/YYYY");

        if (this.data.voucherType.toLowerCase() == "product") {
            this.data.productGift = this.productGift.map(x => x.id).join(',');
            delete this.data.nominal;
        }

        this.service.edit(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.id });
                alert("Data Saved");
            })
            .catch(e => {
                this.error = e.message;
            });
    }
}
