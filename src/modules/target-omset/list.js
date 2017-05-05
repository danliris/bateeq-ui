import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "751db2f6-782e-43d5-a087-f014de8ceb69",//Target vs Omset – 2 Bulan Terakhir
        "321248e4-5348-41f6-9f96-91a731dd3d43",//Target vs Omset – Per Quarter
        "f10a69f1-f6a5-4bc0-8bb4-9a2cbbb0b096",//Target vs Omset – Per Tahun
        "f671d795-fac5-4c81-bf23-8fd4cb80dbb7",//Top 10 Toko Pencapaian Target Tertinggi – 2 Bulan Terakhir
        "4e8445d3-11f6-42e0-991d-b8a4bd2aa0ec",//Top 10 Toko Pencapaian Target Terendah – 2 Bulan Terakhir
    ];
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate() {
        this.service.search('')
            .then(data => {
                console.log(data);
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
