import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
// import { activationStrategy } from 'aurelia-router';
import { moment } from 'moment';

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
        this.voucherTypeList = [
            "Percentage",
            "Nominal",
            "Buy n free m",
            "Buy n discount m%",
            "Buy n discount m% product (n)th",
            "Pay nominal Rp.xx, Free 1 product"
        ];

        this.categorySourcesList = [
            "Product",
            "Category"
        ];
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    // determineActivationStrategy() {
    //     return activationStrategy.replace; //replace the viewmodel with a new instance
    //     // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    //     // or activationStrategy.noChange to explicitly use the default behavior
    // }

    checkZero(data) {
        if (data.length == 1) {
            data = "0" + data;
        }
        return data;
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        if (obj == undefined)
            return false;

        return true;
    }

    save(event) {
        // console.log(this.storage);
        // console.log(this.data);
        // console.log(this);

        var startDateDate = this.data.startDate;
        // console.log(startDateDate.toString());
        this.data.startDate = startDateDate.getDate().toString().padStart(2, '0') + '/' + (startDateDate.getMonth() + 1).toString().padStart(2, '0') + '/' + startDateDate.getFullYear()

        var endDateDate = new Date(this.data.endDate);
        // console.log(startDateDate);
        this.data.endDate = endDateDate.getDate().toString().padStart(2, '0') + '/' + (endDateDate.getMonth() + 1).toString().padStart(2, '0') + '/' + endDateDate.getFullYear()
        // this.data.description = this.description;
        

        var request = this.data;

        if(request.productPurchase)
            request.productPurchase = request.productPurchase.id;

        if(request.productGift)
            request.productGift = request.productGift.id;

        if(request.categoryPurchase)
            request.categoryPurchase = request.categoryPurchase.Id;

        if(request.voucherType == 'Buy n discount m%' && request.assignToCategory == 'Product')
            request.productPurchase = request.productPurchaseMultiple.map(function(data){ return data.id}).join(',');

        if(request.voucherType == 'Buy n discount m%' && request.assignToCategory == 'Category')
            request.categoryPurchase = request.categoryPurchaseMultiple.map(function(data){ return data.id}).join(',');

        if(request.voucherType == 'Pay nominal Rp.xx, Free 1 product')
            request.productGift = request.productGiftMultiple.map(function(data){return data.id}).join(',');

        console.log(request);
        this.service.create(request)
            .then(result => {
                console.log("masuk then")
                console.log(result);
                var isempty = this.isEmpty(result);
                console.log(isempty);
                if (isempty) {
                    // console.log(result.data);
                    alert("Lengkapi kembali Form dengan tanda bintang");
                } else {
                    // console.log(result);
                    alert("Voucher berhasil di update");
                    this.data.startDate = startDateDate.getFullYear()+ '-' +  (startDateDate.getMonth() + 1).toString().padStart(2, '0') + '-'+startDateDate.getDate().toString().padStart(2, '0') ;
                    this.data.endDate = endDateDate.getFullYear()+'-'+ (endDateDate.getMonth() + 1).toString().padStart(2, '0')+'-' +endDateDate.getDate().toString().padStart(2, '0');
                    this.router.navigateToRoute('list', {}, { replace: true, trigger: true });
                }
            })
            .catch(e => {
                console.log("masuk catch");
                console.log(e);
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                }
                else if (e.statusCode == 400) {
                    console.log("masuk 400");
                    console.log(e.data);
                    alert("Lengkapi kembali Form dengan tanda bintang");
                } else {
                    this.error = e;
                }
            });
    }

    delete(event) {
        console.log(event);
    }

    parseToReq(args) {
        var result = {};
        var typeVoucher = args.voucherType ? args.voucherType.toLowerCase() : "";
        switch (typeVoucher) {
            case "percentage":
                break;
            case "nominal":
                break;
            case "buy n free m":
                break;
            case "buy n discount m%":
                break;
            case "buy n discount m% product (n)th":
                break;
            case "pay nominal rp.xx, free 1 product":
                break;
            default:
                break;
        }
    }
}