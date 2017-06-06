import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "TOP 10 NAMA PAKAIAN PER KONTER - 2 QUARTER TERAKHIR",
        "TOP 10 STYLE PAKAIAN PER TOKO - 2 QUARTER TERAKHIR",
        "TOP 10 STYLE PAKAIAN PER KOTA - 2 QUARTER TERAKHIR",
        "TOP 10 MOTIF PAKAIAN PER TOKO - 2 QUARTER TERAKHIR",
        "TOP 10 MOTIF PAKAIAN PER KOTA - 2 QUARTER TERAKHIR",
        "TOP 10 UKURAN PAKAIAN PER TOKO - 2 QUARTER TERAKHIR",
        "TOP 5 RANGE HARGA JUAL PAKAIAN PER GROUP KONTER - TAHUN BERJALAN",
        "TOP 5 RANGE HARGA JUAL PAKAIAN PER KOTA - TAHUN BERJALAN",
        "TOP 10 UKURAN PAKAIAN PER KOTA - 2 QUARTER TERAKHIR",
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
