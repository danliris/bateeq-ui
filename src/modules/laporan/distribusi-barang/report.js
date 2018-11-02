import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var StorageLoader = require('../../../loader/storage-loader');
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
        { id: 0, text: 'Belum Diterima' },
        { id: 1, text: 'Sudah Diterima' }
    ]

    packingListStatus = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.transactionType = this.transactionTypeOptions[0];
        this.packingListStatus = this.packingListStatusOptions[0];
    }

    columns = [
        {
            field: "date", title: "Tanggal",
            formatter: function (value, data, index) {
                var moment = require('moment');
                return moment(value).format("DD MMMM YYYY");
            }
        },
        { field: "source", title: "Sumber Penyimpanan" },
        {
            field: "spkDocuments", title: "Tujuan Penyimpanan",
            formatter: function (value, data, index) {
                var destination = "";
                if (value.length > 0) {
                    destination = value[0].destination.name;
                }
                return destination;
            }
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
            packingListStatus: this.packingListStatus.id || 0,
            storageId: this.storage._id || ''
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
            packingListStatus: this.packingListStatus.id || 0,
            storageId: this.storage._id || ''
        }

        this.service.search(filter).then(result => {
            this.data = result.data.map(item => {
                var details = item.spkDocuments.map(packinglist => {
                    var sendQuantity = 0;
                    var price = 0;

                    sendQuantity = packinglist.items.reduce((sum, curr) => parseInt(sum || 0) + parseInt(curr.sendQuantity || 0), 0);
                    price = packinglist.items.reduce((sum, curr) => parseInt(sum || 0) + parseInt(curr.item.domesticCOGS), 0);
                    
                    return {
                        date: moment(item.date).format("DD-MM-YYYY"),
                        source: packinglist.source,
                        destination: packinglist.destination,
                        packingList: packinglist.packingList,
                        transaction: (packinglist.packingList.indexOf("EFR-KB/PLB") != -1 ? 0 : 1),
                        transactionName: (packinglist.packingList.indexOf("EFR-KB/PLB") != -1 ? "Pengiriman Barang Baru" : "Pengiriman Barang Retur"),
                        status: (packinglist.isReceived ? 1 : 0),
                        statusName: (packinglist.isReceived ? "Sudah Diterima" : "Belum Diterima"),
                        sendQuantity: sendQuantity,
                        totalPrice: price
                    }
                });

                return [].concat.apply([], details);
            })

            this.data = [].concat.apply([], this.data);
        })
    }
}
