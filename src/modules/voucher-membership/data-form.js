import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const ProductLoader = require('../../loader/product-list-bateeqshop-loader');

@containerless()
@inject(Service, BindingEngine)
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

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
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
            if (this.context)
                this.context.productGift.push({ id: newVal.id, name: newVal.name })
            this.selectedProductGift = "";
        }
    }

    removeProductGift(index) {
        if (this.context)
            this.context.productGift.splice(index, 1);
    }

    get productLoader() {
        return ProductLoader;
    }

    productView(data) {
        return data.name;
    }
} 
