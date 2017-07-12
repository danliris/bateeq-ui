import { inject, Lazy} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class List {
    context = ['detail'];
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
    }

    create() {
        this.router.navigateToRoute('create');
    }

    columns = [
        { field: 'code', title: 'Kode RDP'},
        { field: 'name', title: 'Nama RDP'},
        { field: 'type', title: 'Tipe RDP'},
        { field: 'discFrom', title: 'Diskon dari' },
        { field: 'discTo', title: 'Diskon sampai' },
    ];

    loader = (info) => {
        var order = {};
        
        if (info.sort) {
            order[info.sort] = info.order;
        }

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.service.search(arg)
            .then(result =>{
                var data = {};
                data.total = result.info.total;
                data.data = result.data;
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
        
    };

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data._id })
        }
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }
}