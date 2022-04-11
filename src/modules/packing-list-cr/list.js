import { inject, Lazy} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var moment = require("moment");
var locale = 'id-ID';

@inject(Router, Service)
export class List {
    context = ['detail'];
    data = [];
    info = {
      page: 1,
      keyword: '',
      filter: JSON.stringify({
        "IsReceived": false
      })
    };
    keyword = '';


    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    create() {
        this.router.navigateToRoute('create');
    }

    columns = [
        { field: 'packingList', title: 'Nomor Packing List'},
        { field: 'SourceName', title: 'Sumber Penyimpanan'},
        { field: 'DestinationName', title: 'Tujuan Penyimpanan' },
        { field: '_createdDate', title: 'Tanggal Kirim',
        formatter: (value, data) => {
            return moment(value).locale(locale).format("DD MMMM YYYY");
        }
      },
        { field: 'isDraft', title: 'Status' }
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
                for (var data of result.data) {
                    if (data.isDraft) {
                        data.isDraft = "Draft";
                    } else {
                        data.isDraft = "Tersimpan";
                    }
                }
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
        };
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }
}


