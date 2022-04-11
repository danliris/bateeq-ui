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

    // transactionType = {};

    packingListStatusOptions = [
        { id: 0, text: 'Belum Masuk Ekspedisi', isDistributed : false },
        { id: 1, text: 'Sudah Masuk Ekspedisi', isDistributed : true}
    ]

    packingListStatus = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.transactionType = this.transactionTypeOptions[0];
        this.packingListStatus = this.packingListStatusOptions[0];
        this.packingListNo = "";
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
            field: "destinationName", title: "Tujuan Penyimpanan",
            formatter: function (value, data, index) {
                var destination = "";
                if (value.length > 0) {
                    destination = value[0].destinationName;
                }
                return destination;
            }
        },
        { field: "transaksi", title: "Transaksi" },
        { field: "packingList", title: "packingList" },
        { field: "Quantity", title: "Total Kuantitas Barang" },
        { field: "itemDomesticSale", title: "Total Harga Jual" }
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
            status: this.packingListStatus.isDistributed || false,
            destinationCode: this.storage.code || '',
            packingList: this.packingListNo
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
            status: this.packingListStatus.isDistributed || false,
            destinationCode: this.storage.code || '',
            packingList: this.packingListNo
        }
        console.log(filter)
        this.service.search(filter).then(spkDocs => {
            var totalQty;
            var totalPrice;
            this.data.results = [];
            if (spkDocs != undefined) {
                var tanggalRowSpan = 0;
                //result.items = [];
                //console.log(spkDocs)
                for (var data of spkDocs) {
                    var result = {};
                    var itemRowSpan = 0;
                    //var itemData = {};
                    //itemData.details = [];
                    totalQty = 0;
                    totalPrice = 0;
                    result.tanggal = new Date(data.date);
                    //for (var item of data.items) {
                        // var detail = {};
                        // detail.barcode = item.item.code;
                        // detail.namaProduk = item.item.name;
                        // detail.quantity = item.quantity;
                        // detail.price = item.item.domesticSale;
                        // totalQty += parseInt(detail.quantity);
                        // totalPrice += parseInt(detail.price * detail.quantity);
                        // itemData.details.push(detail);
                        // tanggalRowSpan += 1;
                        // itemRowSpan += 1;
                    result.barcode = data.itemCode;
                    result.namaProduk = data.itemName;
                    result.quantity = data.Quantity;
                    result.price = data.itemDomesticSale;
                    totalQty += parseInt(result.quantity);
                    totalPrice += parseInt(result.price * result.quantity);
                    tanggalRowSpan += 1;
                    itemRowSpan += 1;
                    //}
                    // itemData.tanggal = new Date(data.date);
                    // itemData.itemRowSpan = itemRowSpan;
                    result.itemRowSpan = itemRowSpan;
                    result.destinationName = data.destinationName;
                    result.destinationCode = data.destinationCode;
                    result.sourceName = data.sourceName;
                    result.sourceCode = data.sourceCode;
                    // itemData.source = data.source;
                    // itemData.destination = data.destination;
                    // itemData.destination = data.destination;
                    result.transaction = this.transactionType.id == 0 ? "Pengiriman Barang Baru" : "Pengiriman Barang Baru Return";
                    result.packingList = data.packingList;
                    //itemData.packingList = data.packingList;
                    //itemData.status = this.packingListStatus.id == 0 ? "Belum Masuk Ekspedisi" : "Sudah Masuk Ekspedisi";
                    result.isDistributed = data.isDistributed == false ? "Belum Masuk Ekspedisi" : "Sudah Masuk Ekspedisi";
                    result.totalQty = totalQty;
                    result.totalPrice = totalPrice;
                    //result.items.push(itemData);
                    result.tanggalRowSpan = tanggalRowSpan;
                    console.log(result);
                    this.data.results.push(result);
                }
                console.log(this.data.results)
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
        this.reportHTML += "                <th>Barcode</th>";
        this.reportHTML += "                <th>Nama Produk</th>";
        this.reportHTML += "                <th>Kuantitas Barang</th>";
        this.reportHTML += "                <th>Harga Jual Barang</th>";
        // this.reportHTML += "                <th>Total Harga</th>";
        this.reportHTML += "                <th>Status</th>";
        this.reportHTML += "            </tr>";
        this.reportHTML += "        </thead>";
        this.reportHTML += "        <tbody>";
        for (var data of this.data.results) {
            var isTanggalRowSpan = false;
            var tanggalrowspan = 0;
            // for (var item of data.items) {
                var isItemRowSpan = false;
                // for (var itemDetail of item.details) {
                    var filter = true;
                    tanggalrowspan++;
                    this.reportHTML += "        <tr>";
                    if (!isItemRowSpan) {
                        this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.tanggal.getDate() + " " + months[data.tanggal.getMonth()] + " " + data.tanggal.getFullYear() + "</td>";
                        this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.sourceName + "</td>";
                        this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.destinationName + "</td>";
                        this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.transaction + "</td>";
                        this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.packingList + "</td>";
                        this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.barcode + "</td>";
                        this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.namaProduk + "</td>";
                        this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + (data.totalQty).toLocaleString() + "</td>";
                        this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + (data.price).toLocaleString() + "</td>";
                        this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + data.isDistributed + "</td>";
                        //this.reportHTML += "        <td width='300px' rowspan='" + data.itemRowSpan + "'>" + (data.totalPrice).toLocaleString() + "</td>";
                    }
                    this.reportHTML += "        </tr>";
                    isTanggalRowSpan = true;
                    isItemRowSpan = true;
                //}
            //}
            this.reportHTML = this.reportHTML.replace(moment(data.tanggal).format(), tanggalrowspan);
        }
        this.reportHTML += "        </tbody>";
        this.reportHTML += "    </table>";
    }

} 
