import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var moment = require("moment");
var locale = 'id-ID';

@inject(Router, Service)
export class List {
    

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    bind() {
        this.setContext();
        this.setColumns();
    }

    setContext() {
        this.context = ["Rincian"];
    }

    setColumns() {
        this.columns = [
            { field: "code", title: "Nomor Dokumen" },
            { field: "reference", title: "Nomor Referensi" },
            { field: "source.code", title: "Sumber Penyimpanan",
            formatter: function (value, data) {
                    return value + " - " + data.source.name;
                } 
             },
            { field: "destination.code", title: "Tujuan Penyimpanan",
            formatter: function (value, data) {
                    return value + " - " + data.destination.name;
                } 
              },
            { 
                field: "spk.password", title: "Password",
                formatter: function (value, row, index) {
                    return value ? value : "";
                } 
            },
            { 
                field: "spk.isReceived", title: "Status",
                formatter: function (value, row, index) {
                    return value ? "Sudah Diterima" : "Belum Diterima";
                } 
            },
            {
                field: "_createdDate", title: "Tanggal", formatter: (value, data) => {
                    return moment(value).locale(locale).format("DD MMMM YYYY");
                }
            },
            { field: "_createdBy", title: "Dibuat Oleh" }
        ];
    }

    loadData = (info) => {
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
                var dataResult = result.data;
                // for(var a of dataResult){
                //     this.service.getSPKByReference(a.code).then(
                //         spk => {
                //             a.spk = spk;
                //         }
                //     )
                //     a.source.code = `${a.source.code} - ${a.source.name}`;
                //     a.destination.code = `${a.destination.code} - ${a.destination.name}`;
                // }
                // return {
                //     total: result.info.total,
                //     data: dataResult
                // }
                var dataSPKB = [];
                for(var a of dataResult){
                   dataSPKB.push(this.service.getSPKByReference(a.code));
                }
                return Promise.all(dataSPKB)
                .then(data => {
                    for(var a of dataResult){
                        function searchItem(params) {
                            return params ? params.reference === a.code : null;
                        }
                        var item = data.find(searchItem);
                        if(item)
                            a.spk = item
                    }
                    return {
                        total: result.info.total,
                        data: dataResult
                    };
                });
            });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    contextShowCallback(index, name, data) {
        return true;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
        }
    }
}
