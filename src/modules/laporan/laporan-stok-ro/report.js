import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Report {

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.reportHTML = "";
        this.error = "";
        this.code = "";
    }

    options = {
        columns: [],
        search: false,
        showToggle: false,
        showColumns: false,
        undefinedText: '0'
    };

    data = [];
    visibleTable = false;

    exportToExcel() {
        this.service.generateXls(this.code);
    }

    showReport() {
        this.visibleTable = true;
        console.log(this.code);
        var dataItem = [];
        if (this.code === '') {
            this.error = "Masukkan kode Realisasi Order";
        } else {
            this.service.getAllByRO(this.code)
                .then(items => {
                    console.log(items);
                    this.generateReportHTML(items);
                });
        }
    }

    generateReportHTML(data) {
        var tableHeader = [];
        this.data = [];
        for (var items of data) {
            var item = {
                name: items._id
            };
            //Generate header
            for (var i = 0; i < items.items.length; i++) {
                var roItems = items.items[i];

                if (tableHeader.indexOf(roItems.item) === -1) {
                    tableHeader.push(roItems.item);
                }

                item[roItems.item] = roItems.quantity;

                for (var j = 0; j < items.items.length; j++) {
                    if (roItems.itemcode !== items.items[j].itemcode && roItems.item === items.items[j].item) {
                        item[roItems.item] += items.items[j].quantity ;
                    }
                }
            }
            this.data.push(item);
        }

        tableHeader.sort();
        //kosongin data sebelumnya
        this.options.columns = [];
        this.options.columns.push({ field: 'name', title: '', class: 'nameBackground', width: '30%' });
        for (var header of tableHeader) {
            this.options.columns.push({ field: header, title: header, sortable: true });
        }
        new Promise((resolve, reject) => {
            this.models.__table("refreshOptions", this.options);
            resolve();
        }).then(() => {
            this.models.refresh();
        });
    }
}
