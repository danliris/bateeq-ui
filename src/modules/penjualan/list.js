import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "PERTUMBUHAN OMSET KESELURUHAN - 2 BULAN TERAKHIR",
        "PERTUMBUHAN OMSET KESELURUHAN - TAHUNAN DAN QUARTER",
        "TOP 10 TOKO OMSET PENJUALAN TERTINGGI - 2 BULAN TERAKHIR",
        "TOP 10 TOKO OMSET PENJUALAN TERENDAH - 2 BULAN TERAKHIR",
        "PERBANDINGAN OMSET HEAD TO HEAD (BULAN)",
        "PERBANDINGAN OMSET HEAD TO HEAD (QUARTER)",
        "JUMLAH TRANSAKSI BERDASARKAN WAKTU DI TOKO - 2 BULAN TERAKHIR",
    ];
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate() {
        this.service.search('')
            .then(data => {
                for (var report of this.listReport) {
                    var _data = data.find((_data) => _data.name === report);
                    if (_data) {
                        this.data.push(_data);
                    }
                }
            })
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data.id });
    }
}
