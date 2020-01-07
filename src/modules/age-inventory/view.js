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
        console.log(params);  
        this.info.keyword = '';
        var storageId = params.storageId;
        var itemId = params.itemId; 
        var result = await this.service.getAllMovement(storageId, itemId, this.info);
        this.data = result.data;
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
        var itemId = params.itemId; 
        this.service.getAllMovement(storageId, itemId, this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
                var moment = require('moment');
                for (var obj of this.data) {
                    obj.date = moment(obj.date, "YYYY-MM-DDTHH:mm:SSSZ").format("DD MMM YYYY - HH:mm:SS")
                }
            })
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
