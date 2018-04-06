import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './../service';

@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    readOnlyDiscount = true;
    storeNameOptions = [];

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

        if (this.data.items) {
            this.data.items.forEach(item => {
                item.toString = function () {
                    return [this.code, this.name]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
            });

            this.storeNameOptions.push(this.data.stores.name);
        }
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save(event) {
        this.validateUI(this.data);

        if (Object.getOwnPropertyNames(this.error).length < 1) {
            this.service.update(this.data).then(result => {
                this.cancel();
            }).catch(e => {
                this.error = e;
            });
        }
    }

    validateUI(data) {
        //Check Field if Empty
        if (data.discount === 0) {
            this.error.discount = "Masukkan Nilai Diskon"
        }

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

        if (data.store.name === "- stores -") {
            this.error.storeName = "Pilih Toko";
        }

        //Check endDate Field for input date less than startDate
        if (data.endDate < data.startDate) {
            this.error.endDate = "Tidak Boleh Kurang Dari Mulai Berlaku Diskon";
        }
    }
}