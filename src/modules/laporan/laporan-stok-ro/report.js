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
    show = false;

    productItemChanged(newValue, oldValue) {
        this.readOnlyCode = true;
        this.readOnlyColor = true;
        var config = Container.instance.get(Config);

        if (this.error.code) {
            this.error = {};
        }

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
        if (this.code === '') {
            this.error.code = "Masukkan kode Realisasi Order";
        } else {
            this.service.generateXls(this.code);
        }
    }

    showReport() {
        var dataItem = [];
        if (this.code === '') {
            this.error.code = "Masukkan kode Realisasi Order";
        } else {
            this.service.getStokByRO(this.code)
                .then(items => {
                    this.generateReportHTML(items);
                    if (items) {
                        this.show = true;
                    } else {
                        this.show = false;
                    }
                });
        }
    }

    generateTableInfo(size) {
        var tableHeader = [];
        var colHeaderOne = [];
        var colHeaderTwo = [];

        //initiate columns
        colHeaderOne.push({ title: "Toko", field: "store", rowspan: 2, valign: "middle", width: "200px" });

        for (var i = 0; i < size.length; i++) {
            var onInventory = size[i] + ".onInventory";
            var onSales = size[i] + ".onSales";

            //initiate columns
            var col = { title: size[i], colspan: 2 };

            var stok = { title: "Stok", field: onInventory, align: "center" };
            var stokOnSale = { title: "Stok Terjual", field: onSales, align: "center" };

            colHeaderOne.push(col);
            colHeaderTwo.push(stok);
            colHeaderTwo.push(stokOnSale);
        }

        colHeaderOne.push({ title: "Umur", field: "age", rowspan: 2, align: "center" });
        colHeaderOne.push({ title: "Total Stok", field: "totalOnInventory", rowspan: 2, align: "center" });
        colHeaderOne.push({ title: "Total Stok Terjual", field: "totalOnSales", rowspan: 2, align: "center" });

        tableHeader.push(colHeaderOne);
        tableHeader.push(colHeaderTwo);

        return tableHeader;
    }

    generateReportHTML(dataResult) {
        var columns = []
        var size = [];
        var tempArr = [];
        this.data = [];

        for (var dataItem of dataResult) {
            if (!this.data[dataItem.storageName]) {
                this.data[dataItem.storageName] = {};
                this.data[dataItem.storageName]["store"] = dataItem.storageName;
                this.data[dataItem.storageName]['age'] = dataItem.age;
            }

            if (this.data[dataItem.storageName]) {
                if (!this.data[dataItem.storageName]["totalOnInventory"] && !this.data[dataItem.storageName]["totalOnSales"]) {
                    this.data[dataItem.storageName]["totalOnInventory"] = 0;
                    this.data[dataItem.storageName]["totalOnSales"] = 0;
                }
                this.data[dataItem.storageName]["totalOnInventory"] += dataItem.itemDetail.quantityOnInventory;
                this.data[dataItem.storageName]["totalOnSales"] += dataItem.itemDetail.quantityOnSales;
            }

            if (!this.data[dataItem.storageName][dataItem.itemDetail.size]) {
                this.data[dataItem.storageName][dataItem.itemDetail.size] = {};
                this.data[dataItem.storageName][dataItem.itemDetail.size]["onInventory"] = dataItem.itemDetail.quantityOnInventory;
                this.data[dataItem.storageName][dataItem.itemDetail.size]["onSales"] = dataItem.itemDetail.quantityOnSales;

            } else {
                this.data[dataItem.storageName][dataItem.itemDetail.size]["onInventory"] = + dataItem.itemDetail.quantityOnInventory;
                this.data[dataItem.storageName][dataItem.itemDetail.size]["onSales"] = + dataItem.itemDetail.quantityOnSales;
            }

            if (size.indexOf(dataItem.itemDetail.size) === -1) {
                size.push(dataItem.itemDetail.size);
            }
        }
        var props = Object.getOwnPropertyNames(this.data);

        for (var i = 1; i < props.length; i++) {
            tempArr.push(this.data[props[i]]);
        }

        columns = this.generateTableInfo(size)
        this.data = tempArr;
        this.options.columns = columns;

        new Promise((resolve, reject) => {
            this.models.__table("refreshOptions", this.options);
            resolve();
        }).then(() => {
            this.models.refresh();
        });
    }
}
