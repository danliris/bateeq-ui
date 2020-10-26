import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const ProductLoader = require('../../loader/process-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly;
    @bindable data = {};
    @bindable error = {};
    @bindable title;

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
        this.error = this.context.error;

        // if (!this.data.BookingOrderDate) {
        //     this.data.BookingOrderDate = new Date();
        // }
        // if(this.data.CanceledQuantity > 0 || this.data.ExpiredBookingQuantity > 0){
        //   this.beginingOrderQuantity = this.data.OrderQuantity + this.data.ExpiredBookingQuantity + this.data.CanceledQuantity;
        // }

        // var arg = {
        //     page:  1,
        //     size: 1,
        // }

        // this.data.maxWH= await this.service.searchWHConfirm(arg)
        //     .then(result => {
        //         return result.data[0].UnitMaxValue + result.data[0].SKMaxValue;
                
        //     });
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    get productLoader() {
        return []
        // return ProductLoader
    }
} 
