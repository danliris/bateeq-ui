import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './../service';

@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    readOnlyDiscount = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.prId = id;
        this.data = await this.service.getById(id);
        this.data.isEdit = true;
        this.isShowing = true;
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save(event) {
        this.error = {};
        //this.validateUI(this.data);
        // if (this.data.stores.length > 1) {
        //     this.data.stores = {"name":"ALL"};
        // } 
        if (Object.getOwnPropertyNames(this.error).length < 1) {
            this.service.update(this.data).then(result => {
                this.cancel();
            }).catch(e => {
                this.error = e;
            });
        }
    }

    validateUI(data) {
        if (data.startDate === undefined) {
            this.error.startDate = "Masukkan Tanggal Mulai Berlaku Diskon"
        }

        if (data.endDate === undefined) {
            this.error.endDate = "Masukkan Tanggal Selesai Berlaku Diskon"
        }

        if (data.discountMapping === "- discount -") {
            this.error.discountMapping = "Pilih tipe Diskon";
        }

        if (data.storeCategory === "- categories -") {
            this.error.storeCategory = "Pilih Kategori Toko";
        }

        if (data.stores.name === "- stores -") {
            this.error.storeName = "Pilih Toko";
        }

        //Check endDate Field for input date less than startDate
        if (data.endDate < data.startDate) {
            this.error.endDate = "Tidak Boleh Kurang Dari Mulai Berlaku Diskon";
        }
        
        //Check if item inside items not have realization Order
        data.items.forEach(item => {
            if (!item.realizationOrder) {
                item['realizationOrder'] = { 'realizationOrder': 'NO' };
            }
        });
    }
}