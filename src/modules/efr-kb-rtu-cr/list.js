import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    info = { page: 1, keyword: '' };
    keyword = '';
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate() {
        this.info.keyword = '';
        var result = await this.service.search(this.info);
        this.data = result.data;
        this.info = result.info;
        for (var item of this.data) {
            var spk = await this.service.getSPKByReference(item.code);
            item.spk = spk;
        }
    }

    loadPage() {
        var keyword = this.info.keyword;
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
                this.info.keyword = keyword;

                for (var item of this.data) {
                    debugger;
                    this.service.getSPKByReference(item.code).then(
                        spk => {
                            item.spk = spk;
                        }
                    )
                }
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
