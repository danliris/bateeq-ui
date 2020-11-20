import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var StorageLoader = require('../../../loader/nstorage-loader');
import moment from 'moment';

@inject(Router, Service)
export class Report {
    storage = {};

    dateFrom = new Date();
    dateTo = new Date();

    data = [];

    transactionTypeOptions = [
         { id: 0, text: 'Pengiriman Barang Baru' },
         { id: 1, text: 'Pengiriman Barang Retur' }
    ]

    transactionType = {};

    packingListStatusOptions = [
        { id: 0, text: 'Belum Diterima', isReceived: false },
        { id: 1, text: 'Sudah Diterima', isReceived: true }
    ]

    packingListStatus = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.transactionType = this.transactionTypeOptions[0];
        this.packingListStatus = this.packingListStatusOptions[0];
        this.packingListNo = ""
    }

    columns = [
        {
            field: "date", title: "Tanggal",
            formatter: function (value, data, index) {
                var moment = require('moment');
                return moment(value).format("DD MMMM YYYY");
            }
        },
        { field: "sourceName", title: "Sumber Penyimpanan" },
        {
            field: "destinationName", title: "Tujuan Penyimpanan"
            // ,
            // // formatter: function (value, data, index) {
            // //     var destination = "";
            // //     if (value.length > 0) {
            // //         destination = value[0].destination.name;
            // //     }
            // //     return destination;
            // }
        },
        { field: "transaksi", title: "Transaksi" },
        { field: "packingList", title: "packingList" },
        { field: "totalQuantity", title: "Total Kuantitas Barang" },
        { field: "totalPrice", title: "Total Harga Jual" }
    ];

    async attached() {

    }

    get storageLoader() {
        return StorageLoader;
    }

    excel() {
        this.dateFrom = moment(this.dateFrom).startOf('day');
        this.dateTo = moment(this.dateTo).endOf('day');
        var filter = {
            dateFrom: this.dateFrom.format('YYYY-MM-DD'),
            dateTo: this.dateTo.format('YYYY-MM-DD'),
            transaction: this.transactionType.id || 0,
            status: this.packingListStatus.isReceived || false,
            destinationCode : this.storage.code || '',
            packingList : this.packingListNo
        }
        this.service.generateExcel(filter);
    }

    showReport() {
        this.dateFrom = moment(this.dateFrom).startOf('day');
        this.dateTo = moment(this.dateTo).endOf('day');

        var filter = {
            dateFrom: this.dateFrom.format('YYYY-MM-DD'),
            dateTo: this.dateTo.format('YYYY-MM-DD'),
            transaction: this.transactionType.id || 0,
            status: this.packingListStatus.isReceived || false,
            destinationCode : this.storage.code || '',
            packingList : this.packingListNo
        }

        this.service.search(filter).then(results => {
            var totalQty;
            var totalPrice;
            this.data.result = [];
            if (results != undefined) {
                var tanggalRowSpan = 0;
                for (var data of results) {
                    var duplicate = this.data.result.find((item) => item.packingList === data.packingList);
                    if(!duplicate){
                        totalQty = 0;
                        totalPrice = 0;
                        var result = {};
                        var itemRowSpan = 0;
                        for (var data1 of results){
                            if(data.packingList === data1.packingList){
                                totalQty += parseInt(data1.Quantity);
                                totalPrice += parseInt(data1.itemDomesticSale * data1.Quantity);
                            }
                        }
                        result.tanggal = new Date(data.date);                        
                        tanggalRowSpan += 1;
                        itemRowSpan += 1;

                        result.itemRowSpan = itemRowSpan;
                        result.destinationName = data.destinationName;
                        result.destinationCode = data.destinationCode;
                        result.sourceName = data.sourceName;
                        result.sourceCode = data.sourceCode;
    
                        result.transaction = this.transactionType.id == 0 ? "Pengiriman Barang Baru" : "Pengiriman Barang Return";
                        result.packingList = data.packingList;
    
                        result.isReceived = data.isReceived == false ? "Belum Diterima" : "Sudah Diterima";
                        result.totalQty = totalQty;
                        result.totalPrice = totalPrice;
    
                        result.tanggalRowSpan = tanggalRowSpan;
                        this.data.result.push(result);
                    }
                }
            }
            this.generateReportHTML();
        })
    }

        generateReportHTML() {
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
            this.reportHTML = "";
            this.reportHTML += "    <table class='table table-bordered'>";
            this.reportHTML += "        <thead>";
            this.reportHTML += "            <tr style='background-color:#282828; color:#ffffff;'>";
            this.reportHTML += "                <th>Tanggal</th>";
            this.reportHTML += "                <th>Sumber Penyimpanan</th>";
            this.reportHTML += "                <th>Tujuan Penyimpanan</th>";
            this.reportHTML += "                <th>Transaksi</th>";
            this.reportHTML += "                <th>Packing List</th>";
            this.reportHTML += "                <th>Status</th>";
            this.reportHTML += "                <th>Total Kuantitas Barang</th>";
            this.reportHTML += "                <th>Total Harga Jual</th>";
            this.reportHTML += "            </tr>";
            this.reportHTML += "        </thead>";
            this.reportHTML += "        <tbody>";
            for (var data of this.data.result) {
                var isTanggalRowSpan = false;
                var tanggalrowspan = 0;
                // for (var item of data.items) {
                    var isItemRowSpan = false;
                    // for (var itemDetail of item.details) {
                        // var filter = true;
                        tanggalrowspan++;
                        this.reportHTML += "        <tr>";
                        if (!isItemRowSpan) {
                            this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.tanggal.getDate() + " " + months[data.tanggal.getMonth()] + " " + data.tanggal.getFullYear() + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.sourceName + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.destinationName + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.transaction + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.packingList + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.isReceived + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + (data.totalQty).toLocaleString() + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + (data.totalPrice).toLocaleString() + "</td>";
                        }
                        this.reportHTML += "        </tr>";
                        isTanggalRowSpan = true;
                        isItemRowSpan = true;
                    // }
                    this.reportHTML = this.reportHTML.replace(moment(data.tanggal).format(), tanggalrowspan);
                // }
            }
            this.reportHTML += "        </tbody>";
            this.reportHTML += "    </table>";
        }
    }

