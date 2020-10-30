import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';
import $ from 'jquery';

@inject(Router, Service)
export class Report {

    options = {
        columns: [
            { field: 'Store.Name', title: 'Toko' },
            { field: 'GrandTotal', title: 'Omset' },
            { field: 'Count', title: 'Kuantitas' }
            
        ],
        search: false,
        showColumns: false,
        showToggle: false
    };
    
    options2 = {
        columns: [
            { field: 'Store.Name', title: 'Toko' },
            { field: 'GrandTotal', title: 'Omset' },
            { field: 'Count', title: 'Kuantitas' },
            { field: 'Remark', title: 'Keterangan'}            
            
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

        this.standaloneGrandTotal = this.getGrandTotal(apiResult.CategoryList.StandAlone);
        this.consignmentGrandTotal = this.getGrandTotal(apiResult.CategoryList.Konsinyasi);
        this.onlineGrandTotal = this.getGrandTotal(apiResult.CategoryList.Online);
        this.generalSalesGrandTotal = this.getGrandTotal(apiResult.CategoryList.WholeSale);
        this.vvipGrandTotal = this.getGrandTotal(apiResult.CategoryList.vvip);
        this.totalOmset = this.standaloneGrandTotal + this.consignmentGrandTotal + this.onlineGrandTotal + this.generalSalesGrandTotal+this.vvipGrandTotal;
        console.log(this.totalOmset);
        this.standaloneCount = this.getCount(apiResult.CategoryList.StandAlone);
        this.consignmentCount = this.getCount(apiResult.CategoryList.Konsinyasi);
        this.onlineCount = this.getCount(apiResult.CategoryList.Online);
        this.generalSalesCount = this.getCount(apiResult.CategoryList.WholeSale);
        this.vvipCount = this.getCount(apiResult.CategoryList.vvip);
        this.totalQuantity = this.standaloneCount + this.consignmentCount + this.onlineCount + this.generalSalesCount + this.vvipCount;
        console.log(this.totalQuantity);
        this.standalone = this.convertToLocaleString(this.getArray(apiResult.DataList.StandAlone));        

        this.consignment = this.convertToLocaleString(this.getArray(apiResult.DataList.Konsinyasi));
        this.online = this.convertToLocaleString(this.getArray(apiResult.DataList.Online));
        var dimGeneralSales = this.convertToLocaleString(this.getArray(apiResult.DataList.WholeSale));
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
        var dimVvip = this.convertToLocaleString(this.getArray(apiResult.DataList.vvip));
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
            return object.GrandTotal;
        }
        else {
            return 0;
        }
    }

    getCount(object) {
        console.log(object);
        if (typeof object !== "undefined") {
            return object.Count;
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
        console.log(array);
        for (var a of array){
            a.GrandTotal = a.GrandTotal.toLocaleString();
            a.Count = a.Count.toLocaleString();
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
