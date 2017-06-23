import { inject, Lazy} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var moment = require("moment");
var locale = 'id-ID';

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

    create() {
        this.router.navigateToRoute('create');
    }

    columns = [
            { field: "code", title: "Kode Barang" },
            { field: "name", title: "Nama Barang" },
            { field: "article.realizationOrder", title: "RO" }
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
                };
            });
        
    };

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data._id });
        }
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    upload() {
        this.router.navigateToRoute('upload');
    }

    uploadImage() {
        this.router.navigateToRoute('upload-image');
    }
}

