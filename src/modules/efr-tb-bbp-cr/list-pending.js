import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Pending {
    data = [];
    info = { page: 1, keyword: '' };
    keyword = '';
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    // activate() {
    //     this.service.listPending()
    //         .then(data => {
    //             this.data = data;
    //         })
    // }

    async activate() {
        this.info.keyword = '';
        var result = await this.service.listPending(this.info);
        this.data = result.data;
        this.info = result.info;
    }

    loadPage() {
        var keyword = this.info.keyword;
        this.service.listPending(this.info)
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

    accept(data) {
        this.router.navigateToRoute('create', { id: data._id })
    }

    create(view) {
        this.router.navigateToRoute('create');
    }
}