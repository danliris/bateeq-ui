import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    data = [];
    info = { page: 1, keyword: '' };
    params = {};
    keyword = '';
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }


    async activate(params) {
        this.params = params;
        this.info.keyword = '';
        var storageId = params.storageId;
        var itemCode = params.itemCode; 
        var result = await this.service.getAllMovement(storageId, itemCode);
        this.data = result;
        this.info = result.info;
        var moment = require('moment');
        for (var obj of this.data) {
            obj.date = moment(obj.date, "YYYY-MM-DDTHH:mm:SSSZ").format("DD MMM YYYY - HH:mm:SS")
        }
    }

   loadPage() {
        var params = this.params;
        var keyword = this.info.keyword;
        var storageId = params.storageId;
        var itemCode = params.itemCode; 
        this.service.getAllMovement(storageId, itemCode)
            .then(result => {
                this.data = result;
                this.info = result.info;
                var moment = require('moment');
                for (var obj of this.data) {
                    obj.Date = moment(obj.Date, "YYYY-MM-DDTHH:mm:SS.FFFFFFFZZZ").format("DD MM YYYY - HH:mm:SS")
                }
            })
    }

    moveexcel(params) {
        var params = this.params;
       // var keyword = this.info.keyword;
        var storageId = params.storageId;
        var itemCode = params.itemCode; 
        this.service.movementExcel(storageId, itemCode);
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    list() {
        this.router.navigateToRoute('list');
    }
}
