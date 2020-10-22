import { inject, BindingEngine, bindable } from 'aurelia-framework';
import { Service } from '../service';
var ItemLoader = require('../../../../loader/finishgood-loader-discount');
const moment = require('moment');

@inject(BindingEngine, Service)
export class ROItemDetails {
    @bindable dataDestination;
    constructor(service) {
        this.service = service;
        this.innerData = {};
    }

    activate(context) {
        //console.log(context);
        this.data = context.data;
        //console.log(context.data);
        this.error = context.error;
        console.log(context.error);
        this.options = context.context.options;
        this.innerData = this.options.innerData;
        this.readOnly = context.options.readOnly;

        if (this.data.code) {
            if (this.data.code._id) {
                this.data = this.data.code;
            }
        }

        if (this.data) {
            var error = this.data.error;

            if (error) {
                this.error = {};
                this.error['code'] = this.data.error;
            }
        }

        if (this.data) {
            this.dataDestination = this.data.dataDestination;
            //console.log(this.selectedBillNo);
          }
    }

    async codeChanged(e) {
        this.error = {};
        console.log(e);
       // var innerData = this.innerData;
        await this.service.getItemByCode(e.srcElement.value).then(result => {
            //    for(var datas of result){
            //                 //console.log(datas);
            //         this.data.push(datas)
            //     }
               this.readOnly = true;
               //this.RO = newValue.realizationOrder
               console.log(this.data);
        })

        // if (item.length > 0) {
        //     var errorCode = "";

        //     item.forEach(dataItem => {
        //         var formStart = moment(innerData.startDate).startOf('day');
        //         var formEnd = moment(innerData.endDate).endOf('day');
        //         var itemStart = moment(dataItem.startDate).startOf('day');
        //         var itemEnd = moment(dataItem.endDate).endOf('day');
        //         if (innerData.discountOne == dataItem.discountOne &&
        //             innerData.discountTwo == dataItem.discountTwo) {

        //             if (formStart >= itemStart &&
        //                 formStart <= itemEnd ||
        //                 itemStart >= formStart &&
        //                 itemStart <= formEnd) {
        //                 errorCode = "Produk sudah digunakan";
        //             }
        //         } else {

        //             if (formStart >= itemStart &&
        //                 formStart <= itemEnd ||
        //                 itemStart >= formStart &&
        //                 itemStart <= formEnd) {
        //                 errorCode = "Produk sudah digunakan";
        //             }
        //         }
        //     });

        //     this.error.code = errorCode;
        // }
        // var itemsData = this.data.code;
        // Object.assign(this.data, itemsData);
    }
    dataDestinationChanged(newValue, oldValue) {

        //console.log(this.selectedBillNo)
        if (this.dataDestination && this.dataDestination._id) {
         //  this.data.Id = this.selectedBillNo.Id;
         //  this.data.billNo = this.selectedBillNo.bilNo;
          //this.data.arrivalDate = this.selectedBillNo.arrivalDate;
         // this.deliveryOrder.totalAmount=  this.deliveryOrder.totalAmount.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
         //  this.totalAmount = this.selectedBillNo.totalAmount.toLocaleString('en-EN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
          //this.data.totalAmount = this.selectedBillNo.totalAmount;
          this.data.dataDestination = this.dataDestination;
       }
       else {
   
         this.data.dataDestination = undefined;
         // this.data.Id = "";
         // this.data.billNo = "";
         // this.data.doNo = "";
         // this.data.currency = "";
         // this.data.doDate = undefined;
       }
     }
    get itemLoader() {
        return ItemLoader;
    }
}