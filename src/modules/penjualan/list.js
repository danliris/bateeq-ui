import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "b08585eb-4731-45d1-a957-f5705c351f2e",//   Pertumbuhan Omset Keseluruhan – 2 Bulan Terakhir
        "e1797dae-4029-4b7b-bb84-3c97107d52bf",//	Pertumbuhan Omset Keseluruhan – Tahunan dan Quarter
        "70ae4c9a-6081-418a-80c7-61252f7b59c6",//	Top 10 Toko Omset Penjualan Tertinggi – 2 Bulan Terakhir
        "7225d3ad-f544-48c6-b690-75db4f4ce34f",//	Top 10 Toko Omset Penjualan Terendah – 2 Bulan Terakhir
        "3d2912aa-3b28-476b-a2f4-1695025731a9",//	Perbandingan Omset Head to Head (Bulan)
        "703410d9-82c8-4347-92a6-658883952733",//	Perbandingan Omset Head to Head (Quarter)
        "d271ab58-54cb-4f3d-897f-0692321a880e",//	Jumlah Transaksi Berdasarkan Waktu di Toko – 2 Bulan Terakhir

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
