import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
const ProductBateeqShopLoader = require('../../loader/product-bateeqshop-loader');
// const ProductLoader = require('../../loader/process-loader');
const ProductLoader = require('../../loader/product-list-bateeqshop-loader');
const CategoryLoader = require('../../loader/category-list-bateeqshop-loader');

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
        if(!this.data.productGiftMultiple)
            this.data.productGiftMultiple = [];        
        if(!this.data.categoryPurchaseMultiple)
            this.data.categoryPurchaseMultiple=[];
        if(!this.data.productPurchaseMultiple)
            this.data.productPurchaseMultiple= [];
        
        // this.data.combo.voucherType = voucherTypeSources;
        this.voucherTypeList = this.context.voucherTypeList;
        this.error = this.context.error;
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }
    
    get productLoader() {
        return ProductLoader;
    }

    get categoryLoader(){
        return CategoryLoader;
    }

    categoryView(data){
        return data.name;
    }
    
    productView(data) {
        return data.name;
    }
    @bindable selectedProductGiftMultiple
    selectedProductGiftMultipleChanged(newVal,oldVal){
        // console.log(newVal);
        if (newVal) {
            if (this.data)
                this.data.productGiftMultiple.push({ id: newVal.id, name: newVal.name })
            this.selectedProductGiftMultiple = "";
        }
    }
    @bindable selectedProductPurchaseMultiple
    selectedProductPurchaseMultipleChanged(newVal,oldVal){
        if (newVal) {
            if (this.data)
                this.data.productPurchaseMultiple.push({ id: newVal.id, name: newVal.name })
            this.selectedProductPurchaseMultiple = "";
        }
    }

    @bindable selectedCategoryPurchase
    selectedCategoryPurchaseChanged(newVal,oldVal){
        if(newVal){
            if(this.data)
                this.data.categoryPurchaseMultiple.push({id : newVal.id, name: newVal.name})
                this.selectedCategoryPurchase = "";
        }
    }

    @bindable selectedVoucherType
    selectedVoucherTypeChanged(newVal,oldVal){
        console.log("value :",newVal);
        console.log("Before reset : %o%",this.data);
        this.data.voucherType = newVal;
        this.resetForm();
        console.log("After reset : %o%",this.data);
    }

    removeProductGift(index) {
        if (this.data)
            this.data.productGiftMultiple.splice(index, 1);
    }
    removeCategoryPurchase(index) {
        if (this.data)
            this.data.categoryPurchaseMultiple.splice(index, 1);
    }
    removeProductPurchase(index){
        if(this.data)
            this.data.productPurchaseMultiple.splice(index,1);

    }

    resetForm(voucherType){
        console.log(voucherType);
        this.data = {};
        this.data.voucherType = voucherType;
    }
} 
