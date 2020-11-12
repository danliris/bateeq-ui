import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var StorageLoader = require('../../../loader/nstorage-loader');


@inject(Router, Service, Element)
export class CheckBalance {
    showTable = false;
    readOnly = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.stockOpnameBalance = [];
    }

    get storageLoader() {
        return StorageLoader;
    }

    checkBalance() {
        this.service.getBalanceByStorage(this.data.storage)
            .then((result) => {
                this.stockOpnameBalance = result;
                this.showTable = true;
            })
            .catch((error) => {
                Promise.reject(error);
            });
    }

    productColumns = [
        { header: "Barcode", value: "product.code" },
        { header: "Nama", value: "product.name" },
        { header: "Kuantitas SO", value: "product.quantity" },
        { header: "Tanggal SO", value: "opnameDate" }
    ];
}