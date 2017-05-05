import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "7ed031e5-937e-4903-a6a7-7e3bff28d579",//	Top 10 Jenis Kain Per Kota – 2 Quarter Terakhir
        "a5a4162a-f319-4ec8-8dc8-d1319e848d6f",//	Top 10 Jenis Kain Per Toko – 2 Quarter Terakhir

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
