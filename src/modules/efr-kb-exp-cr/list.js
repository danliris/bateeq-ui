import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    context = ["detail"];
    data = [];
    info = { page: 1, keyword: '' };
    keyword = '';
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    // async activate() {
    //     this.info.keyword = '';
    //     var result = await this.service.search(this.info);
    //     this.data = result.data;
    //     this.info = result.info;
    // }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    columns = [
        { field: "code", title: "Nomor Dokumen" },
        { field: "name", title: "Ekspedisi" },
        { field: "weight", title: "Berat (Kg)" },
        {
            field: "date", title: "Tanggal",
            formatter: function (value, data, index) {
                var moment = require('moment');
                return moment(value).format("DD MMMM YYYY");
            }
        },
        {
            field: "destination", title: "Tujuan",
            formatter: function (value, data, index) {
                return value;
            }
        },
        { field: "CreatedBy", title: "Dibuat Oleh" }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                data.data.forEach(s => {
                    if (typeof s.expedition === 'object') {
                        s.expedition.toString = function () {
                            return s.expedition.name || "";
                        }
                    }
                });
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data._id });
                break;
        }
    }
}
