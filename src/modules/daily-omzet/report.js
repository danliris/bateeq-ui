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
    
    options2 = {
        columns: [
            { field: 'store.name', title: 'Toko' },
            { field: 'grandTotal', title: 'Omset' },
            { field: 'count', title: 'Kuantitas' },
            { field: 'remark', title: 'Keterangan'}            
            
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
        let apiResult = await this.service.getSalesSummary(dateFrom.format('YYYY-MM-DD'), dateTo.format('YYYY-MM-DD'))
            .then(result => {
                return result;
            });

        this.standaloneGrandTotal = this.getGrandTotal(apiResult.category.standalone);
        this.consignmentGrandTotal = this.getGrandTotal(apiResult.category.consignment);
        this.onlineGrandTotal = this.getGrandTotal(apiResult.category.online);
        this.generalSalesGrandTotal = this.getGrandTotal(apiResult.category.generalSales);
        this.vvipGrandTotal = this.getGrandTotal(apiResult.category.vvip);
        this.totalOmset = this.standaloneGrandTotal + this.consignmentGrandTotal + this.onlineGrandTotal + this.generalSalesGrandTotal
            + this.vvipGrandTotal;

        this.standaloneCount = this.getCount(apiResult.category.standalone);
        this.consignmentCount = this.getCount(apiResult.category.consignment);
        this.onlineCount = this.getCount(apiResult.category.online);
        this.generalSalesCount = this.getCount(apiResult.category.generalSales);
        this.vvipCount = this.getCount(apiResult.category.vvip);
        this.totalQuantity = this.standaloneCount + this.consignmentCount + this.onlineCount + this.generalSalesCount
            + this.vvipCount;

        this.standalone = this.convertToLocaleString(this.getArray(apiResult.data.standalone));        

        this.consignment = this.convertToLocaleString(this.getArray(apiResult.data.consignment));
        this.online = this.convertToLocaleString(this.getArray(apiResult.data.online));
        var dimGeneralSales = this.convertToLocaleString(this.getArray(apiResult.data.generalSales));
        var arrGeneralSales = [];
        for(var item of dimGeneralSales){
            var remark = "";
            if(item.remark && item.remark.length > 0){
                for(var a of item.remark){
                  remark += `${a.Ket} :Rp.${parseInt( a.Totalrp ).toLocaleString()} ;`;  
                }
                item.remark = remark;
            }
            arrGeneralSales.push(item);           
        }
        this.generalSales = arrGeneralSales;

        //this.vvip = this.convertToLocaleString(this.getArray(apiResult.data.vvip));
        var dimVvip = this.convertToLocaleString(this.getArray(apiResult.data.vvip));
        var arrVvip = [];
        for(var item of dimVvip){
            var remark = "";
            if(item.remark && item.remark.length > 0){
                for(var a of item.remark){
                  remark += `${a.Ket} :Rp.${parseInt( a.Totalrp ).toLocaleString()} ;`;  
                }
                item.remark = remark;
            }
            arrVvip.push(item);           
        }
        this.vvip = arrVvip;

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

    convertToLocaleString(array){
        for (var a of array){
            a.grandTotal = a.grandTotal.toLocaleString();
            a.count = a.count.toLocaleString();
        }
        return array;
    }

    attached() {
        let hide = '<span class="glyphicon glyphicon-menu-up"></span> Hide';
        let show = '<span class="glyphicon glyphicon-menu-down"></span> Show';
        $(document).ready(function () {
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
            $("#consignment_table").hide();
            $("#consignment_button").click(function () {
                if ($("#consignment_button").text().trim().toLowerCase() === "show") {
                    $("#consignment_button").html(hide);
                }
                else {
                    $("#consignment_button").html(show);
                }
                $("#consignment_table").slideToggle();
            });
            $("#online_table").hide();
            $("#online_button").click(function () {
                if ($("#online_button").text().trim().toLowerCase() === "show") {
                    $("#online_button").html(hide);
                }
                else {
                    $("#online_button").html(show);
                }
                $("#online_table").slideToggle();
            });
            $("#generalSales_table").hide();
            $("#generalSales_button").click(function () {
                if ($("#generalSales_button").text().trim().toLowerCase() === "show") {
                    $("#generalSales_button").html(hide);
                }
                else {
                    $("#generalSales_button").html(show);
                }
                $("#generalSales_table").slideToggle();
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
        });
    }
}
