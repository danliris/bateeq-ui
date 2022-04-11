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
            {
              field: "referensi",
              title: "Nomor Referensi"
            },
            { field: "sourcecode", title: "Sumber",
            formatter: function (value, data) {
                    return value + " - " + data.sourcename;
                } 
             },

             {
               field: "transfername",
               title: "Tujuan",
            //  formatter: function (value, row, index) {
            //     return `${value.transfername}`;
            //    // return value ? "GDG.01 - GUDANG BARANG JADI 1" : "";
            //     } 
               },

            {
              field: "destinationname",
              title: "Transfer Ke",
            formatter: function (value, data) {
                    return value + " - " + data.destinationname;
                } 
              },
            { 
                field: "password", title: "Password",
                formatter: function (value, row, index) {
                    return value ? value : "";
                } 
            },
            {
                field: "createdDate", title: "Tanggal", formatter: (value, data) => {
                    return moment(value).locale(locale).format("DD MMMM YYYY");
                }
            },
            {
              field: "createdBy",
              title: "Dibuat Oleh"
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
                var dataResult = result.data;
                var dataSPKB = [];
                let dataPLTS = [];
                return {
                                      total: result.info.total,
                                      data: dataResult
                                  };
                // for(var a of dataResult){
                //    dataSPKB.push(this.service.getSPKByReference(a.code));
                //    dataPLTS.push(this.service.getPackingListTransferStock(a.code));
                // }
                // return Promise.all(dataSPKB)
                //     .then(data => {
                       
                //         for (var i = 0; i < dataResult.length; i++) {
                //             for(var b = 0; b < data.length; b++){
                //                 if(data[b] != undefined && data[b].length > 0){
                //                     dataResult[i].spk = data[i][0];
                //                 }
                //             }
                //         }

                //         // for(var a of dataResult){
                //         //     for(var b = 0; b < data.length; b++){
                //         //         if(data[b] != undefined && data[b].length > 0){
                //         //             a.spk = data[b][0];
                //         //         }
                //         //     }
                //         // }

                //         return Promise.all(dataPLTS)
                //             .then(dataPLTS => {
                //                 for (let i = 0; i < dataResult.length; i++) {
                //                     const packingListTransferStock = dataPLTS[i];
                //                     let tujuan;
                //                     if (packingListTransferStock) {
                //                         if (packingListTransferStock[0].source.code == packingListTransferStock[1].destination.code) {
                //                             tujuan = packingListTransferStock[0].source;
                //                         } else if (packingListTransferStock[0].destination.code == packingListTransferStock[1].source.code) {
                //                             tujuan = packingListTransferStock[0].destination;
                //                         }
                //                     }
                //                     dataResult[i].tujuan = tujuan;
                //                 }

                //                 return {
                //                     total: result.info.total,
                //                     data: dataResult
                //                 };
                //             })
                //     });
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
                this.router.navigateToRoute('view', { id: data.id });
                break;
        }
    }
}




