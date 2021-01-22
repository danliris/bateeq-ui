import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, ServiceProduct } from './service';
import { moment } from 'moment';

@inject(Router, Service, ServiceProduct)
export class Edit {
    hasCancel = true;
    hasSave = true;
    isEdit = true;

    constructor(router, service, serviceProduct) {
        this.router = router;
        this.service = service;
        this.serviceProduct = serviceProduct;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        // if (this.data) {
        //     let productIds = []
        //     if (this.data.productGift) productIds.push(this.data.productGift)
        //     if (this.data.productPurchase) productIds.push(this.data.productPurchase)
        //     let product = await this.serviceProduct.getProductByIds(productIds)

        //     this.data.productGift = product.find(x => x.id == this.data.productGift)
        //     this.data.productPurchase = product.find(x => x.id == this.data.productPurchase)
        // }
    }
    bind() {
        // this.data = {};
        // this.error = {};
        // this.voucherTypeList = [
        //     "Percentage",
        //     "Nominal",
        //     "Buy n free m",
        //     "Buy n discount m%",
        //     "Buy n discount m% product (n)th",
        //     "Pay nominal Rp.xx, Free 1 product"
        // ];

        this.categorySourcesList = [
            "Product",
            "Category"
        ];
    }
    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save(event) {
        var startDateDate = new Date(this.data.startDate);
        console.log(startDateDate);
        this.data.startDate = startDateDate.getDate().toString().padStart(2, '0') + '/' + (startDateDate.getMonth() + 1).toString().padStart(2, '0') + '/' + startDateDate.getFullYear()

        var endDateDate = new Date(this.data.endDate);
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

        // console.log(endDateDate);
        this.service.edit(request)
            .then(result => {
                console.log("masuk then")
                console.log(result);
                // console.log(result.message);
                var isempty = this.isEmpty(result);
                console.log(isempty);
                if (isempty) {
                    //console.log(result.message);
                    alert("Lengkapi kembali Form dengan tanda bintang");
                    throw exception;
                } else {
                    // console.log(result);
                    alert("Voucher berhasil di update");
                    this.data.startDate = startDateDate.getFullYear()+ '-' +  (startDateDate.getMonth() + 1).toString().padStart(2, '0') + '-'+startDateDate.getDate().toString().padStart(2, '0') ;
                    this.data.endDate = endDateDate.getFullYear()+'-'+ (endDateDate.getMonth() + 1).toString().padStart(2, '0')+'-' +endDateDate.getDate().toString().padStart(2, '0');
                    this.router.navigateToRoute('view', { id: this.data.id });
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
    // cancelCallback(event) {
    //     this.router.navigateToRoute('view', { id: this.data.Id });
    // }

    // saveCallback(event) {
    //     this.service.update(this.data)
    //         .then(result => {
    //             this.router.navigateToRoute('view', { id: this.data.Id });
    //         })
    //         .catch(e => {
    //             this.error = e;
    //         })
    // }
}
