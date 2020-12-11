import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    dataToBeCompleted = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    bind() {
        this.setContext();
        this.setColumns();
    }

    setContext() {
        this.context = ["Rincian", "Proses"];
    }

    setColumns() {
        this.columns = [
            { field: "code", title: "SO Dokumen" },
            { field: "storage.name", title: "Sumber Penyimpanan" },
            {
                field: "date", title: "Tanggal", formatter: (value, data) => {
                    return moment(value).format("DD-MMM-YYYY");
                }
            },
            { field: "CreatedBy", title: "Dibuat Oleh" },
            { 
                field: "isProcessed", title: "Status",
                formatter: function (value, row, index) {
                    return value ? "Sudah diproses" : "Belum diproses";
                } 
            }
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
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    // asc() {
    //     return function (so1, so2) {
    //         if (so1.isComplete && !so2.isComplete)
    //             return -1;
    //         if (!so1.isComplete && so2.isPending())
    //             return -1;
    //         if (!so1.isComplete && so2.isComplete)
    //             return 1;
    //         if (so1.isPending() && !so2.isComplete)
    //             return 1;

    //         return 0;
    //     }
    // }

    // desc() {
    //     return function (so1, so2) {
    //         if (so1.isComplete && !so2.isComplete)
    //             return 1;
    //         if (!so1.isComplete && so2.isPending())
    //             return 1;
    //         if (!so1.isComplete && so2.isComplete)
    //             return -1;
    //         if (so1.isPending() && !so2.isComplete)
    //             return -1;

    //         return 0;
    //     }
    // }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "Proses":
                this.router.navigateToRoute('edit', { id: data._id });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
        case "Proses":
            return data.isProcessed ? false : true;
        default:
            return true;
        }
    }

    upload() {
        this.router.navigateToRoute('upload');
    }

    download() {
        var endpoint = 'stock-opname/by-user/download';
        var request = {
          method: 'GET'
        };
    
        var getRequest = this.service.endpoint.client.fetch(endpoint, request);
        this.service._downloadFile(getRequest);
        this.service.publish(getRequest);
      }
}