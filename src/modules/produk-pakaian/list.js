import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "ad452edf-385f-4971-a5e7-1ce0d2700a16",//	Top 10 Nama Pakaian Per Konter – 2 Quarter Terakhir
        "e3cf2c11-45fa-479d-a375-ea1792f4e9ab",//	Top 10 Style Pakaian Per Toko – 2 Quarter Terakhir
        "fddb456a-1d93-4804-97d2-7954eaada927",//	Top 10 Style Pakaian Per Kota – 2 Quarter Terakhir
        "a64b0ab9-0d96-4135-bfe9-aa2c08e3b0d1",//	Top 10 Motif Pakaian Per Toko – 2 Quarter Terakhir
        "0b8f8283-92dc-47f9-bb09-ace32d897d38",//	Top 10 Motif Pakaian Per Kota – 2 Quarter Terakhir
        "0dda23ae-84a6-4bd1-a93c-85b4787a70a7",//	Top 10 Ukuran Pakaian Per Toko – 2 Quarter Terakhir
        "91d8cdda-b64d-49e4-8ceb-656465c79deb",//	Top 5 Range Harga Jual Pakaian Per Group Konter – Tahun Berjalan
        "3903be0b-4b0d-45cf-9983-29e313b8d2bc",//	Top 5 Range Harga Jual Pakaian Per Kota – Tahun Berjalan
        "ff146604-6f09-4798-980c-12944ae16daf",//	Top 10 Ukuran Pakaian Per Kota – 2 Quarter Terakhir 
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
