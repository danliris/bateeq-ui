import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './../service';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    bind() {
        this.error = {};
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    save(event) {
        this.error = {};
        this.validateUI(this.data);

        if (Object.getOwnPropertyNames(this.error).length < 1) {
            this.service.create(this.data)
                .then(result => {
                    this.list();
                })
                .catch(e => {
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
