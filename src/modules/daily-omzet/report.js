import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
import $ from 'jquery';

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

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate() {
        let dateFrom = moment(new Date()).startOf('day');
        let dateTo = moment(new Date()).endOf('day');
        let apiResult = await this.service.getSalesSummary(dateFrom.format(), dateTo.format())
            .then(result => {
                return result;
            });

        this.standalone_grandTotal = this.getGrandTotal(apiResult.category.standalone);
        this.fo_grandTotal = this.getGrandTotal(apiResult.category.fo);
        this.bateeqshop_grandTotal = this.getGrandTotal(apiResult.category.bateeqshop);
        this.vvip_grandTotal = this.getGrandTotal(apiResult.category.vvip);
        this.on_konsinyasi_grandTotal = this.getGrandTotal(apiResult.category.on_konsinyasi);
        this.off_konsinyasi_grandTotal = this.getGrandTotal(apiResult.category.off_konsinyasi);
        this.totalOmset = this.standalone_grandTotal + this.fo_grandTotal + this.bateeqshop_grandTotal + this.vvip_grandTotal
            + this.on_konsinyasi_grandTotal + this.off_konsinyasi_grandTotal;

        this.standalone_count = this.getCount(apiResult.category.standalone);
        this.fo_count = this.getCount(apiResult.category.fo);
        this.bateeqshop_count = this.getCount(apiResult.category.bateeqshop);
        this.vvip_count = this.getCount(apiResult.category.vvip);
        this.on_konsinyasi_count = this.getCount(apiResult.category.on_konsinyasi);
        this.off_konsinyasi_count = this.getCount(apiResult.category.off_konsinyasi);
        this.totalQuantity = this.standalone_count + this.fo_count + this.bateeqshop_count + this.vvip_count
            + this.on_konsinyasi_count + this.off_konsinyasi_count;

        this.standalone = this.getArray(apiResult.data.standalone);
        this.fo = this.getArray(apiResult.data.fo);
        this.bateeqshop = this.getArray(apiResult.data.bateeqshop);
        this.vvip = this.getArray(apiResult.data.vvip);
        this.on_konsinyasi = this.getArray(apiResult.data.on_konsinyasi);
        this.off_konsinyasi = this.getArray(apiResult.data.off_konsinyasi);
    }

    getGrandTotal(object) {
        if (typeof object !== "undefined") {
            return object.grandTotal;
        }
        else {
            return 0;
        }
    }

    getCount(object) {
        if (typeof object !== "undefined") {
            return object.count;
        }
        else {
            return 0;
        }
    }

    getArray(object) {
        if (typeof object !== "undefined") {
            return object;
        }
        else {
            return [];
        }
    }

    attached() {
        let hide = '<span class="glyphicon glyphicon-menu-up"></span> Hide';
        let show = '<span class="glyphicon glyphicon-menu-down"></span> Show';
        $(document).ready(function () {
            $("#fo_table").hide();
            $("#fo_button").click(function () {
                if ($("#fo_button").text().trim().toLowerCase() === "show") {
                    $("#fo_button").html(hide);
                }
                else {
                    $("#fo_button").html(show);
                }
                $("#fo_table").slideToggle();
            });
            $("#standalone_table").hide();
            $("#standalone_button").click(function () {
                if ($("#standalone_button").text().trim().toLowerCase() === "show") {
                    $("#standalone_button").html(hide);
                }
                else {
                    $("#standalone_button").html(show);
                }
                $("#standalone_table").slideToggle();
            });
            $("#bateeqshop_table").hide();
            $("#bateeqshop_button").click(function () {
                if ($("#bateeqshop_button").text().trim().toLowerCase() === "show") {
                    $("#bateeqshop_button").html(hide);
                }
                else {
                    $("#bateeqshop_button").html(show);
                }
                $("#bateeqshop_table").slideToggle();
            });
            $("#vvip_table").hide();
            $("#vvip_button").click(function () {
                if ($("#vvip_button").text().trim().toLowerCase() === "show") {
                    $("#vvip_button").html(hide);
                }
                else {
                    $("#vvip_button").html(show);
                }
                $("#vvip_table").slideToggle();
            });
            $("#on_konsinyasi_table").hide();
            $("#on_konsinyasi_button").click(function () {
                if ($("#on_konsinyasi_button").text().trim().toLowerCase() === "show") {
                    $("#on_konsinyasi_button").html(hide);
                }
                else {
                    $("#on_konsinyasi_button").html(show);
                }
                $("#on_konsinyasi_table").slideToggle();
            });
            $("#off_konsinyasi_table").hide();
            $("#off_konsinyasi_button").click(function () {
                if ($("#off_konsinyasi_button").text().trim().toLowerCase() === "show") {
                    $("#off_konsinyasi_button").html(hide);
                }
                else {
                    $("#off_konsinyasi_button").html(show);
                }
                $("#off_konsinyasi_table").slideToggle();
            });
        });
    }
}