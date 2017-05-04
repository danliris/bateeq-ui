import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [  
        "71948851-4283-4a16-8e37-95472f6be84e",//	Top 10 Jenis Jasa Jahit Per Kota – 2 Quarter Terakhir
        "aa2b1849-611a-413d-b288-40896f30c1b4",//	Top 10 Jenis Jasa Jahit Per Toko – 2 Quarter Terakhir
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
