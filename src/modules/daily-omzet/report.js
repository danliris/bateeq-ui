import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class Report {

    options = {
        columns: [
            { field: 'store.name', title: 'Toko' },
            { field: 'grandTotal', title: 'Omset' },
            { field: 'count', title: 'Kuantitas' }
        ],
        search: false,
        showColumns: false,
        showToggle: false
    };

    standalone = [];
    fo = [];
    bateeqshop = [];
    vvip = [];
    on_konsinyasi = [];
    off_konsinyasi = [];

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.dateFrom = moment(new Date()).startOf('day');
        this.dateTo = moment(new Date()).endOf('day');
        
        this.standalone_grandTotal = "";
        this.fo_grandTotal = "";
        this.bateeqshop_grandTotal = "";
        this.vvip_grandTotal = "";
        this.on_konsinyasi_grandTotal = "";
        this.off_konsinyasi_grandTotal = "";
        
        this.standalone_count = "";
        this.fo_count = "";
        this.bateeqshop_count = "";
        this.vvip_count = "";
        this.on_konsinyasi_count = "";
        this.off_konsinyasi_count = "";
    }

    standalone = () => {
        return this.service.getSalesSummary(this.dateFrom.format(), this.dateTo.format())
            .then(result => {
                console.log(result);
                return {
                    data: result.standalone
                }
            })
    };

    fo = () => {
        return this.service.getSalesSummary(this.dateFrom.format(), this.dateTo.format())
            .then(result => {
                return {
                    data: result.fo
                }
            })
    };

    bateeqshop = () => {
        return this.service.getSalesSummary(this.dateFrom.format(), this.dateTo.format())
            .then(result => {
                return {
                    data: result.bateeqshop
                }
            })
    };

    vvip = () => {
        return this.service.getSalesSummary(this.dateFrom.format(), this.dateTo.format())
            .then(result => {
                return {
                    data: result.vvip
                }
            })
    };

    on_konsinyasi = () => {
        return this.service.getSalesSummary(this.dateFrom.format(), this.dateTo.format())
            .then(result => {
                return {
                    data: result.on_konsinyasi
                }
            })
    };

    off_konsinyasi = () => {
        return this.service.getSalesSummary(this.dateFrom.format(), this.dateTo.format())
            .then(result => {
                return {
                    data: result.off_konsinyasi
                }
            })
    };

    activate() {
        this.service.getSalesSummary(this.dateFrom.format(), this.dateTo.format())
            .then(result => {
                this.standalone_grandTotal = (typeof result.standaloneC !== "undefined")? result.standaloneC.grandTotal : 0;
                this.fo_grandTotal = (typeof result.foC !== "undefined")? result.foC.grandTotal : 0;
                this.bateeqshop_grandTotal = (typeof result.bateeqshopC !== "undefined")? result.bateeqshopC.grandTotal : 0;
                this.vvip_grandTotal = (typeof result.vvipC !== "undefined")? result.vvipC.grandTotal : 0;
                this.on_konsinyasi_grandTotal = (typeof result.on_konsinyasiC !== "undefined")? result.on_konsinyasiC.grandTotal : 0;
                this.off_konsinyasi_grandTotal = (typeof result.off_konsinyasiC !== "undefined")? result.off_konsinyasiC.grandTotal : 0;
                
                this.standalone_count = (typeof result.standaloneC !== "undefined")? result.standaloneC.count : 0;
                this.fo_count = (typeof result.foC !== "undefined")? result.foC.count : 0;
                this.bateeqshop_count = (typeof result.bateeqshopC !== "undefined")? result.bateeqshopC.count : 0;
                this.vvip_count = (typeof result.vvipC !== "undefined")? result.vvipC.count  : 0;
                this.on_konsinyasi_count = (typeof result.on_konsinyasiC !== "undefined")? result.on_konsinyasiC.count : 0;
                this.off_konsinyasi_count = (typeof result.off_konsinyasiC !== "undefined")? result.off_konsinyasiC.count : 0;
            })
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