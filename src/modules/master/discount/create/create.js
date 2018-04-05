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
    }

    bind() {
        this.data = { items: [] };
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

        this.data.items.map(item => {
            return item["item"] = item.code;
        });

        this.data.items.forEach(item => {
            item.itemId = item.item._id;
            delete item.code;
        });
        
        if (Object.getOwnPropertyNames(this.error).length < 1) {
            this.service.create(this.data)
                .then(result => {
                    this.list();
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }

    validateUI(data) {
        //Check Field if Empty
        if (data.discount === 0 ) {
            this.error.discount = "Masukkan Nilai Diskon"
        }

        if (data.startDate === undefined) {
            this.error.startDate = "Masukkan Tanggal Mulai Berlaku Diskon"
        }

        if (data.endDate === undefined) {
            this.error.endDate = "Masukkan Tanggal Selesai Berlaku Diskon"
        }

        if (data.discountMapping === "- discount -" ) {
            this.error.discountMapping = "Pilih tipe Diskon";
        }

        if (data.storeCategory === "- categories -") {
            this.error.storeCategory = "Pilih Kategori Toko";
        }

        if (data.store.name === "- stores -") {
            this.error.storeName = "Pilih Toko";
        }

        //Check endDate Field for input date less than startDate
        if (data.endDate < data.startDate) {
            this.error.endDate = "Tidak Boleh Kurang Dari Mulai Berlaku Diskon";
        }
    }
}
