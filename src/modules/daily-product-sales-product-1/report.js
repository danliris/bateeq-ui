import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

@inject(Router, Service)
export class Report {

    query = {
        page: 1, size: 25
    }

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.summary = [];
        this.reportHTML = "";
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
        var dateFrom = moment(new Date()).subtract(1, 'days').startOf('day');
        var dateTo = moment(new Date()).subtract(1, 'days').endOf('day');
        this.service.getSummary(dateFrom.format('YYYY-MM-DD'), dateTo.format('YYYY-MM-DD'), this.query)
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
        var config = Container.instance.get(Config);
        for (var item of this.summary) {
            item.maximized = false;
            item.masterItem = item.masterItem.length > 0 ? item.masterItem[0] : null;
            if (item.masterItem)
                item.masterItem.imageUrl = `${config.getEndpoint("master").client.baseUrl}items/finished-goods/image/${item.masterItem._id}`;
            var totalItem = 0;
            var stores = [];
            for (var store of item.stores) {
                var index = -1;
                if (stores.length > 0) {
                    var index = stores.map(function (e) {
                        var code = e.store.code || "";
                        return (`${code}`)
                    }).indexOf(`${store.store.code}`);
                }
                totalItem += store.quantity;
                if (index != -1) {
                    stores[index].quantity += store.quantity;
                } else {
                    stores.push(store);
                }
            }
            stores.sort(function (a, b) { return -(a.quantity - b.quantity) });
            item.stores = stores;
            item.totalItem = totalItem;
        }
    }
}
