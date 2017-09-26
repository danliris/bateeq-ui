import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

var Itemloader = require('../../../loader/finished-goods-loader')
@inject(Router, Service)
export class Report {
    @bindable productItem;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.reportHTML = "";
        this.error = {};
        this.readOnly = true;
        this.code = "";
        this.colorCode = "";
        this.imagePath = "";
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

    productItemChanged(newValue, oldValue) {
        this.readOnlyCode = true;
        this.readOnlyColor = true;
        var config = Container.instance.get(Config);

        if (this.productItem) {
            var image = `${config.getEndpoint("master").client.baseUrl}items/finished-goods/image/${this.productItem._id}`;
            this.code = this.productItem.article ? this.productItem.article.realizationOrder : null;
            this.color = this.productItem.colorDoc ? this.productItem.colorDoc.name : null;
            this.imagePath = image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY9Y3rGTwbyc9GoAOyxRClRz7b5GnCnjVsHx_qK_CUXN79yis4';
        }
    }

    get itemLoader() {
        return Itemloader;
    }

    exportToExcel() {
        this.service.generateXls(this.code);
    }

    showReport() {
        this.visibleTable = true;
        var dataItem = [];
        if (this.code === '') {
            this.error = "Masukkan kode Realisasi Order";
        } else {
            this.service.getStokByRO(this.code)
                .then(items => {
                    console.log(items);
                    this.generateReportHTML(items);
                });
        }
    }

    compareNumbers(a, b) {
        return a - b;
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
                    tableHeader.push(roItems.item);//item = item size
                }

                item[roItems.item] = roItems.quantity;

                for (var j = 0; j < items.items.length; j++) {
                    if (roItems.itemcode !== items.items[j].itemcode && roItems.item === items.items[j].item) {
                        item[roItems.item] += items.items[j].quantity;
                    }
                }
            }
            this.data.push(item);
        }
        tableHeader.sort(this.compareNumbers);
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
