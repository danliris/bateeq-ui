import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
import { ServiceMembership } from "./service-membership";

const ProductLoader = require('../../loader/product-list-bateeqshop-loader');

@containerless()
@inject(Service, BindingEngine, ServiceMembership)
export class DataForm {
    @bindable readOnly;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable isProduct = false;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    voucherTypeSelection = ["Nominal", "Product"];

    assignToMembership = [];
    
    productGift = [];

    constructor(service, bindingEngine, serviceMembership) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.serviceMembership = serviceMembership;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.serviceMembership.getListMembership({})
            .then(result => {
                this.assignToMembership = result.map(s => {
                    return {
                        label: s.name,
                        value: s.id,
                        checked: false
                    }
                });

                this.data.assignToMembershipIds = this.assignToMembership;
            });
    }

    @bindable voucherType
    voucherTypeChanged(newVal, oldVal) {
        this.data.voucherType = newVal;
        if (newVal.toLowerCase() == "product")
            this.isProduct = true;
        else
            this.isProduct = false;
    }

    @bindable selectedProductGift;
    selectedProductGiftChanged(newVal, oldVal) {
        if (newVal) {
            this.productGift.push({id: newVal.id, name: newVal.name});
            this.data.productGift = this.productGift;
            this.selectedProductGift = "";
        }
    }

    removeProductGift(index) {
        this.productGift.splice(index, 1);
    }

    get productLoader() {
        return ProductLoader;
    }

    productView(data) {
        return data.name;
    }
} 
