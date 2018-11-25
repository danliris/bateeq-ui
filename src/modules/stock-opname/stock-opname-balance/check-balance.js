import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var StorageLoader = require('../../../loader/storage-loader');
var moment = require('moment');


@inject(Router, Service, Element)
export class CheckBalance {
    showTable = false;
    readOnly = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.stockOpnameBalance = {};
        this.isShow = false;
    }

    get storageLoader() {
        return StorageLoader;
    }

    checkBalance() {
        this.service.getBalanceByStorage(this.data.storage)
            .then((result) => {
                this.stockOpnameBalance = result;
                this.isShow = false;
            })
            .catch((error) => {
                Promise.reject(error);
            });
    }

    productColumns = [
        { header: "Barcode", value: "productCode" },
        { header: "Nama", value: "productName" },
        { header: "Kuantitas SO", value: "quantityOpname" },
        { header: "Tanggal SO", value: "_updatedDate" }
    ];
}