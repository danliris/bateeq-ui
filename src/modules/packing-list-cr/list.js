import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    info = { page: 1, keyword: '' };
    keyword = '';

    async activate() {
        this.info.keyword = '';
        var result = await this.service.search(this.info);
        var spk;
        var dataTemp = [];
        for (var i = 0; i < result.length; i++) {
            spk = [];
            var newItem = {};

            newItem = result[i];
            newItem.password = '';
            spk = await this.service.getSPKByReference(result[i].code);
            if (spk != undefined && spk.length > 0) {
                newItem.password = spk[0].password;
            }
            this.data.push(newItem);
        }
        this.info = result.info;
    }

    loadPage() {
        var keyword = this.info.keyword;
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
                this.info.keyword = keyword;
            })
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }
}




