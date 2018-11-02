import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "TARGET VS OMSET - 2 BULAN TERAKHIR",
        "TARGET VS OMSET - PER QUARTER",
        "TARGET VS OMSET - PER TAHUN",
        "TOP 10 TOKO PENCAPAIAN TARGET TERTINGGI - 2 BULAN TERAKHIR",
        "TOP 10 TOKO PENCAPAIAN TARGET TERENDAH - 2 BULAN TERAKHIR",
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
