import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

@inject(Router, Service)
export class List {
    statuses = ["Semua", "Belum Diterima", "Sudah Diterima"];
    storageTemp;
    data;
    rttFilter;
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { filter: {}, results: [] };
        this.error = { filter: {}, results: [] };

        this.data.filter.dateFrom = new Date()
        this.data.filter.dateTo = new Date();
        this.isFilter = false;
        this.reportHTML = ""
    }

    async activate() {
        var storage = await this.service.getByCode("GDG.01");
        this.storageTemp = storage;
        this.data.filter.status = "Semua";

    }

    attached() {
    }


    setStatus(e) {
        var _status = (e ? (e.srcElement.value ? e.srcElement.value : e.detail) : this.status);
        this.data.filter.status = _status;
    }

    reloadItem() {
        this.rttFilter = [];
        this.data.results = [];
        this.error = { filter: {}, results: [] };
        var datefrom = new Date(this.data.filter.dateFrom);
        var dateto = new Date(this.data.filter.dateTo);
        if (dateto < datefrom)
            this.error.filter.dateTo = "Tanggal To Harus Lebih Besar Dari From";
        else {
            var getData = [];
            for (var d = datefrom; d <= dateto; d.setDate(d.getDate() + 1)) {
                var date = new Date(d);
                var from = moment(d).startOf('day');
                var to = moment(d).endOf('day');
                getData.push(this.service.getAllRttByFilter(from.format('YYYY-MM-DD'), to.format('YYYY-MM-DD'), this.data.filter.status));
            }
            Promise.all(getData)
                .then(rttPerDays => {
                    var totalQty;
                    var totalPrice;
                    this.data.results = [];
                    var getSPK = [];
                    for (var rttDay of rttPerDays) {
                        if (rttDay.count != 0) {
                            var tanggalRowSpan = 0;
                            var result = {};
                            result.items = [];
                            for (var data of rttDay.data) {
                                getSPK.push(this.service.getSPKByReference(data.code));
                                var itemRowSpan = 0;
                                var itemData = {};
                                itemData.details = [];
                                totalQty = 0;
                                totalPrice = 0;
                                result.tanggal = new Date(data.date);
                                for (var item of data.items) {
                                    var detail = {};
                                    detail.barcode = item.item.code;
                                    detail.namaProduk = item.item.name;
                                    detail.quantity = item.quantity;
                                    detail.price = item.item.domesticSale;
                                    totalQty += parseInt(detail.quantity);
                                    totalPrice += parseInt(detail.price * detail.quantity);
                                    itemData.details.push(detail);
                                    tanggalRowSpan += 1;
                                    itemRowSpan += 1;
                                }
                                itemData.itemRowSpan = itemRowSpan;
                                itemData.nomorTransferStok = data.code;
                                itemData.source = data.source;
                                itemData.destination = data.destination;
                                itemData.fg = this.storageTemp[0];
                                itemData.totalQty = totalQty;
                                itemData.totalPrice = totalPrice;
                                result.items.push(itemData);
                            }
                            result.tanggalRowSpan = tanggalRowSpan;
                            this.data.results.push(result);
                        }
                    }

                    Promise.all(getSPK)
                        .then(spkDocuments => {
                            var index = 0;
                            for (var rtt of this.data.results) {
                                for (var item of rtt.items) {
                                    var spk = spkDocuments[index][0];
                                    Object.assign(item, { "packingList": spk.packingList });
                                    Object.assign(item, { "status": spk.isReceived ? "Sudah Diterima" : "Belum Diterima" });
                                    index++;
                                }
                            }
                            this.generateReportHTML();
                        });
                })
        }
    }



    generateReportHTML() {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.reportHTML = "";
        this.reportHTML += "    <table class='table table-bordered'>";
        this.reportHTML += "        <thead>";
        this.reportHTML += "            <tr style='background-color:#282828; color:#ffffff;'>";
        this.reportHTML += "                <th>Tanggal</th>";
        this.reportHTML += "                <th>Nomor Transfer Stock</th>";
        this.reportHTML += "                <th>Nomor Packing List</th>";
        this.reportHTML += "                <th>Status Packing List</th>";
        this.reportHTML += "                <th>Dari</th>";
        this.reportHTML += "                <th>Melalui</th>";
        this.reportHTML += "                <th>Ke</th>";
        this.reportHTML += "                <th>Barcode</th>";
        this.reportHTML += "                <th>Nama Barang</th>";
        this.reportHTML += "                <th>Kuantitas Pengiriman</th>";
        this.reportHTML += "                <th>Harga</th>";
        this.reportHTML += "                <th>Total Kuantitas</th>";
        this.reportHTML += "                <th>Total Harga</th>";
        this.reportHTML += "            </tr>";
        this.reportHTML += "        </thead>";
        this.reportHTML += "        <tbody>";
        for (var data of this.data.results) {
            var isTanggalRowSpan = false;
            var tanggalrowspan = 0;
            for (var item of data.items) {
                var isItemRowSpan = false;
                for (var itemDetail of item.details) {
                    var filter = true;
                    if (this.data.filter.status == "Semua" || item.status == this.data.filter.status) {
                        tanggalrowspan++;
                        this.reportHTML += "        <tr>";
                        if (!isTanggalRowSpan) {
                            this.reportHTML += "        <td width='300px' rowspan='" + moment(data.tanggal).format() + "'>" + data.tanggal.getDate() + " " + months[data.tanggal.getMonth()] + " " + data.tanggal.getFullYear() + "</td>";
                        }
                        if (!isItemRowSpan) {
                            this.reportHTML += "        <td width='300px' rowspan='" + item.itemRowSpan + "'>" + item.nomorTransferStok + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + item.itemRowSpan + "'>" + item.packingList + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + item.itemRowSpan + "'>" + item.status + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + item.itemRowSpan + "'>" + item.source.code + "-" + item.source.name + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + item.itemRowSpan + "'>" + item.fg.code + " -" + item.fg.name + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + item.itemRowSpan + "'>" + item.destination.code + "-" + item.destination.name + "</td>";
                        }

                        this.reportHTML += "            <td>" + itemDetail.barcode + "</td>";
                        this.reportHTML += "            <td>" + itemDetail.namaProduk + "</td>";
                        this.reportHTML += "            <td>" + (parseInt(itemDetail.quantity)).toLocaleString() + "</td>";
                        this.reportHTML += "            <td>" + (parseInt(itemDetail.price)).toLocaleString() + "</td>";
                        if (!isItemRowSpan) {
                            this.reportHTML += "        <td width='300px' rowspan='" + item.itemRowSpan + "'>" + (item.totalQty).toLocaleString() + "</td>";
                            this.reportHTML += "        <td width='300px' rowspan='" + item.itemRowSpan + "'>" + (item.totalPrice).toLocaleString() + "</td>";
                        }
                        this.reportHTML += "        </tr>";
                        isTanggalRowSpan = true;
                        isItemRowSpan = true;
                    }
                }
            }
            this.reportHTML = this.reportHTML.replace(moment(data.tanggal).format(), tanggalrowspan);
        }
        this.reportHTML += "        </tbody>";
        this.reportHTML += "    </table>";
    }

}
