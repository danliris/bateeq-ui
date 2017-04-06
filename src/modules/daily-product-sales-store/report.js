import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

@inject(Router, Service)
export class Report {


    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.summary = [];
        this.reportHTML = "";
        this.query = {
            page: 1,
            size: 25,
            totalPage: 1
        }
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

    getData() {
        var dateFrom = moment(new Date()).startOf('day');
        var dateTo = moment(new Date()).endOf('day');
        dateFrom = moment("2017-01-01").startOf('day');
        dateTo = moment("2017-01-31").startOf('day');
        this.service.getSummary(dateFrom.format(), dateTo.format(), this.query)
            .then((result) => {
                this.summary = result.data;
                this.query.size = parseInt(result.query.size || 15);
                this.query.totalPage = parseInt(result.query.totalPage || 1);
                this.query.page = parseInt(result.query.page || 1);
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
        for (var item of this.summary) {
            item.maximized = false;
            var stores = [];
            for (var store of item.stores) {
                var index = stores.map(function (e) { return (e.store ? e.store.code || "" : "") }).indexOf(store.store.code);
                if (index != -1) {
                    stores[index].quantity += store.quantity;
                } else {
                    stores.push(store);
                }
            }
            // stores.sort(function (a, b) { return (a.quantity > b.quantity) ? -1 : ((b.last_nom > a.last_nom) ? 1 : 0); });
            stores.sort(function (a, b) { return -(a.quantity - b.quantity) });
            item.stores = stores;
        }
    }

    generateHtmlReport() {
        this.reportHTML = "";
        this.reportHTML += "    <div class='row' style='margin-top:20px'>";
        for (var item of this.summary) {
            var productName = "";
            productName = (item.masterItem[0]) ? item.masterItem[0].name || "" : "";
            var color = "";
            color = (item.masterItem[0].colorDoc) ? item.masterItem[0].colorDoc.name || "No Color" : "No Color";

            var strItem = `<div class='row'><div class='col-md-2'><img class="img-responsive" src='${item.masterItem.imagePath || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY9Y3rGTwbyc9GoAOyxRClRz7b5GnCnjVsHx_qK_CUXN79yis4"}'></div>`;
            strItem += `<div class='col-md-10'><p><strong>${productName}</strong></p><p>${color}</p><p>Total Kuantitas : ${item.quantity}</p></div></div>`
            this.reportHTML += "<div class='col-md-12' style='margin-bottom:10px'>";
            this.reportHTML += `<td colspan='2'>${strItem}</td>`;
            this.reportHTML += "</div>";

            var stores = [];
            for (var store of item.stores) {
                var index = stores.map(function (e) { return (e.store ? e.store.code || "" : "") }).indexOf(store.store.code);
                if (index != -1) {
                    stores[index].quantity += store.quantity;
                } else {
                    stores.push(store);
                }
            }
            var toggle = `"<button type="button" class="sidebar-toggle" data-toggle="sidebar-toggle" click.delegate="toggleTable($this)">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>"`;

            var table = "<div class='row' class.bind='minimized'><div class='col-md-12'><table class='table table-bordered table-striped' style='margin-bottom:30px'>";
            table += "        <thead>";
            table += "            <tr style='background-color:#ffffff; color:#000000;'>";
            table += `<td style='width:80%'>Toko</td>`;
            table += `<td>Kuantitas</td>`;
            table += "</tr>";
            table += "        </thead>";
            for (var store of stores) {
                table += "<tr>";
                table += `<td>${store.store.name}</td>`;
                table += `<td>${store.quantity}</td>`;
                table += "</tr>";
            }
            table += "</table></div></div>";
            this.reportHTML += toggle;
            this.reportHTML += table;
        }
        this.reportHTML += "    </div>"
    }
}