import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
import { Dialog } from '../../au-components/dialog/dialog';
import { ProductDetailDialog } from './dialogs/products-detail-dialog';

@inject(Router, Service, Dialog)
export class Report {

    query = {
        page: 1, size:25
    }

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.summary = [];
        this.reportHTML = "";
        this.dialog = dialog;
        // this.sizeOptions = [1, 2, 3];
        this.sizeOptions = [25, 50, 100, 200];
    }

    getStringDate(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0! 
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        date = yyyy + '-' + mm + '-' + dd;
        return date;
    }

    activate() {
        this.getData();
    }

    prev() {
        if (this.query.page != 1) {
            this.query.page -= 1;
            this.getData();
        }
    }

    next() {
        if (this.query.page != this.query.totalPage) {
            this.query.page += 1;
            this.getData();
        }
    }

    first() {
        if (this.query.page != 1) {
            this.query.page = 1;
            this.getData();
        }
    }

    last() {
        if (this.query.page != this.query.totalPage) {
            this.query.page = this.query.totalPage;
            this.getData();
        }
    }



    changePage(e) {
        var page = e.detail;
        this.query.page = page;
        this.getData();
    }

    getData() {
        var dateFrom = moment(new Date()).startOf('day');
        var dateTo = moment(new Date()).endOf('day');
        this.service.getStoreSummary(dateFrom.format('YYYY-MM-DD'), dateTo.format('YYYY-MM-DD'), this.query)
            .then((result) => {
                this.summary = result.data;
                this.query.size = parseInt(result.query.size || 15);
                this.query.totalPage = parseInt(result.query.totalPage || 1);
                this.query.page = parseInt(result.query.page || 1);
                this.query.total = parseInt(result.query.total || 1);
                this.summarizeReport();
            });
    }

    changeSize(e) {
        this.query.size = e.detail || e.target.value;
        this.getData();
    }

    toggleTable(item) {
        item.item.maximized = !item.item.maximized;
    }

    summarizeReport() {
        for (var store of this.summary) {
            var items = [];
            for (var item of store.items) {
                var index = -1;
                if (items.length > 0) {
                    var index = items.map(function (e) {
                        var code = e.item.code || "";
                        var size = e.item.size || "";
                        return (`${code}-${size}`)
                    }).indexOf(`${item.item.code}-${item.item.size}`);
                }
                if (index != -1) {
                    items[index].quantity += item.quantity;
                } else {
                    items.push(item);
                }
            }
            items.sort(function (a, b) { return -(a.quantity - b.quantity) });
            store.items = items;
        }
    }

    __productCallback(item) {
        this.showDialog(item);
    }

    showDialog(item) {
        this.dialog.data = item;
        this.dialog.show(ProductDetailDialog, { data: item }).then(response => { });
    }
}
