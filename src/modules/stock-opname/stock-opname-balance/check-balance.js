import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var StorageLoader = require('../../../loader/storage-loader');


@inject(Router, Service, Element)
export class CheckBalance {
    showTable = false;
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
            console.log(result);
            this.stockOpnameBalance = result;
            this.showTable = true;
        })
        .catch((error) => {
            Promise.reject(error);
        });
    }
}