import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
const ProductBateeqShopLoader = require('../../loader/product-bateeqshop-loader');
const ProductLoader = require('../../loader/process-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable voucherTypeList=[];
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    voucherTypeSources = [
        "Percentage", 
        "Nominal",
        "Buy n free m", 
        "Buy n discount m%", 
        "Buy n discount m% product (n)th",
        "Pay nominal Rp.xx, Free 1 product"
    ];

    categorySources = [
        "Man",
        "Woman",
        "Kids"
    ]

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        // this.data.combo.voucherType = voucherTypeSources;
        this.voucherTypeList = this.context.voucherTypeList;
        this.error = this.context.error;
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    // delete(data){
    //     console.log(data);
    // }
    get productLoader() {
        return ProductBateeqShopLoader;
    }
} 
