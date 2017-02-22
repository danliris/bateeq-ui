import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Upload {
    @bindable data;
    @bindable error;
    contacts = [];

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { items: [] };
    }
    
    controlOptions = {
        label: {
            length: 2,
            align: "right"
        },
        control: {
            length: 6
        }
    }

     

    activate(params) {
        this.contacts = [{ "id": 1, "firstName": "el1", lastName: "po1", "email": "el1@gmail.com" },
        { "id": 2, "firstName": "el2", lastName: "po2", "email": "el2@gmail.com" },
        { "id": 3, "firstName": "el3", lastName: "po3", "email": "el3@gmail.com" },
        ];

    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }

    list() {
        this.router.navigateToRoute('list');
    }

    upload() {
        var e = {};
        var formData = new FormData();
        var fileInput = document.getElementById("fileCsv");
        var fileList = fileInput.files;

        if (fileList[0] == undefined) {
            e.file = "File Path harus dipilih";
            this.error = e;
        } else {
            formData.append("fileUpload", fileList[0]);
            var endpoint = 'upload/finished-goods';
            var request = {
                method: 'POST',
                headers: {
                },
                body: formData
            };
            var promise = this.service.endpoint.client.fetch(endpoint, request)
            this.service.publish(promise);
            return promise
                .then((result) => {
                    this.service.publish(promise);
                    if (result.status == 200) {
                        var getRequest = this.service.endpoint.client.fetch(endpoint, request);
                        this.service._downloadFile(getRequest);
                        this.service.publish(getRequest);
                        alert("Upload gagal!\n Ada beberapa data yang harus diperbaiki. Silahkan lihat Error Log untuk melihat detil dari error tersebut.");
                        this.list();
                    }
                    else if (result.status == 404) {
                        alert("Urutan format kolom CSV tidak sesuai.\n Format: Barcode, Nama, UOM, Size, HPP, Harga Jual (Domestic), Harga Jual (Internasional), RO");
                    }
                    else {
                        alert("Data Berhasil Diupload");
                        this.list();
                    }
                    return Promise.resolve(result);
                });
        }
    }
}
