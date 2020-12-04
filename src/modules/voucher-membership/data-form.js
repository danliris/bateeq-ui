import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
import { ServiceMembership } from "./service-membership";

const ProductLoader = require('../../loader/account-loader');

@containerless()
@inject(Service, BindingEngine,ServiceMembership)
export class DataForm {
    @bindable readOnly;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable isVoucher = false;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    productGift = [];

    voucherTypeSelection = [
        { label: "Nominal", value: "nominal" },
        { label: "Voucher", value: "voucher" }
    ];
    
    assignToMembership = [];

    constructor(service, bindingEngine,serviceMembership) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.serviceMembership = serviceMembership;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.serviceMembership.getListMembership({})
            .then(result =>{
                console.log("list membership "+result);
                this.assignToMembership = result.map(s=>{
                    return {
                        label : s.name,
                        value : s.id,
                        checked : false
                    }
                });
            });
    }

    @bindable voucherType
    voucherTypeChanged(newVal, oldVal) {
        this.data.voucherType = newVal.value;
        if (newVal.value == "voucher")
            this.isVoucher = true;
        else
            this.isVoucher = false;
    }

    productChange(e) {
        console.log(selecdtedProductGift);
    }

    deleteProductGift(index) {
        this.productGift.splice(index, 1);
    }

    get productLoader() {
        return ProductLoader;
    }

    productView(data) {
        return data.testA + data.testB;
    }

    addProductInput(data) {
        this.productGift.push(data);
    }
} 
