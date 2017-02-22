import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class Report {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.summary = {};
        this.totalPrice = 0;
        this.totalItems = 0;
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

    calculateSum() {
        this.totalPrice = 0;
        this.totalItems = 0;
        for (var item of this.summary) {
            this.totalPrice += item.grandTotal || 0;
            this.totalItems += item.count || 0;
        }
    }

    activate() {
        var dateFrom = moment(new Date()).startOf('day');
        var dateTo = moment(new Date()).endOf('day');
        this.service.getSummaryStore(dateFrom.format(), dateTo.format())
            .then((result) => {
                this.summary = result;
                this.calculateSum();
                this.generateHtmlReport();
            });
    }

    generateHtmlReport() {
        this.reportHTML = "";
        this.reportHTML += "    <table class='table table-bordered'>";
        this.reportHTML += "        <thead>";
        this.reportHTML += "            <tr style='background-color:#282828; color:#ffffff;'>";
        this.reportHTML += "                <th>Toko</th>";
        this.reportHTML += "                <th>Omset</th>";
        this.reportHTML += "                <th>Kuantitas</th>";
        this.reportHTML += "            </tr>";
        this.reportHTML += "        </thead>";
        this.reportHTML += "        <tbody>";

        for (var data of this.summary) {
            this.reportHTML += "<tr>";
            this.reportHTML += "            <td>" + data.store.name + "</td>";
            this.reportHTML += "            <td class=\"text-right\">" + data.grandTotal.toLocaleString() + "</td>";
            this.reportHTML += "            <td class=\"text-right\">" + data.count.toLocaleString() + "</td>";
            this.reportHTML += "</tr>";
        }

        this.reportHTML += "        </tbody>";
        this.reportHTML += "    </table>";
    }
}