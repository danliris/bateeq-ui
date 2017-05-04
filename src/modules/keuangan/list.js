import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [ 
        "9715c594-61c7-4127-943f-3b444f39bff7",//	Estimasi Untung Rugi – Bulan Berjalan
        "78fcd8f8-c6c0-43a3-a5be-4c336f33577e",//	Pertumbuhan Untung Rugi 
        "61cda4be-a219-44c1-bb13-01fbca56c55d",//	Top 10 Toko Berdasarkan Gross Profit Margin (GPM) – Bulanan
        "103f9f24-fc49-4cfe-8538-e6fa310261e7",//	Top 10 Toko Berdasarkan Net Profit Margin (NPM) - Bulanan

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
