import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "4dac18e3-4874-434d-a4a1-3702d049c80b",//	Pertumbuhan Penjualan Berdasarkan Kuantitas Per Kategori Produk – 2 Quarter Terakhir
        "2f2680ec-519e-4ff9-82b0-b28a4ae0eb9d",//	Pertumbuhan Penjualan Berdasarkan Kuantitas Per Kategori Konter – 2 Quarter Terakhir
    ];

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate() {
        this.service.search('')
            .then(data => {
                for (var report of this.listReport) {
                    var _data = data.find((_data) => _data.id === report);
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
