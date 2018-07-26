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

    // attached() {
    //     this.total = 0;
    //     this.bindingEngine.propertyObserver(this.summary, "summary").subscribe((newValue, oldValue) => {
    //         debugger
    //         this.calculateSum();
    //     });
    // }

    calculateSum() {
        this.totalPrice = 0;
        this.totalItems = 0;
        for (var item of this.summary) {
            this.totalPrice += item.grandTotal || 0;
            this.totalItems += item.count || 0;
        }
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
        var dateFrom = moment(new Date()).startOf('day');
        var dateTo = moment(new Date()).endOf('day');

        this.service.getSummaryPos(dateFrom.format('YYYY-MM-DD'), dateTo.format('YYYY-MM-DD'))
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
        this.reportHTML += "                <th>Jenis Penjualan</th>";
        this.reportHTML += "                <th>Omset</th>";
        this.reportHTML += "                <th>Kuantitas</th>";
        this.reportHTML += "            </tr>";
        this.reportHTML += "        </thead>";
        this.reportHTML += "        <tbody>";

        for (var data of this.summary) {
            this.reportHTML += "<tr>";
            this.reportHTML += "            <td>" + (this.PenjualanByID(data._id) || "") + "</td>";
            this.reportHTML += "            <td class=\"text-right\">" + data.grandTotal.toLocaleString() + "</td>";
            this.reportHTML += "            <td class=\"text-right\">" + data.count.toLocaleString() + "</td>";
            this.reportHTML += "</tr>";
        }

        this.reportHTML += "        </tbody>";
        this.reportHTML += "    </table>";
    }

    PenjualanByID(id) {
        if (id.salesCategory.toLowerCase() == "stand alone" && id.storeCategory.toLowerCase() == "factory outlet" && id.onlineoffline.toLowerCase() == "offline")
            return "Bateeq FO";
        else if (id.salesCategory.toLowerCase() == "stand alone" && id.storeCategory.toLowerCase() == "stand alone" && id.onlineoffline.toLowerCase() == "offline")
            return "Bateeq Stand Alone";
        else if (id.salesCategory.toLowerCase() == "stand alone" && id.storeCategory.toLowerCase() == "stand alone" && id.onlineoffline.toLowerCase() == "online")
            return "BateeqShop"
        else if (id.salesCategory.toLowerCase() == "penjualan vvip" && id.storeCategory.toLowerCase() == "factory outlet" && id.onlineoffline.toLowerCase() == "offline")
            return "Penjualan VVIP"
        else if (id.salesCategory.toLowerCase() == "konsinyasi" && id.storeCategory.toLowerCase() == "market place" && id.onlineoffline.toLowerCase() == "online")
            return "Penjualan Konsinyasi(Online)"
        else if (id.salesCategory.toLowerCase() == "konsinyasi" && id.storeCategory.toLowerCase() == "dept store" && id.onlineoffline.toLowerCase() == "offline")
            return "Penjualan Konsinyasi(Offline)"
    }
}
