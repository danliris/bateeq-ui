import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var StorageLoader = require('../../loader/storage-loader');


@inject(Router, Service, Element)
export class Create {

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { items: [] };
    }

    activate(params) {
    }

    list() {
        this.router.navigateToRoute('list');
    }

    rollbackUpload() {
        debugger
        this.router.navigateToRoute('upload');
    }

    get storageLoader() {
        return StorageLoader;
    }

    upload() {
        var e = {};
        var formData = new FormData();
        var fileInput = document.getElementById("fileCsv");
        var fileList = fileInput.files;
        var storage = this.data.storage;

        if (fileList[0] == undefined) {
            e.file = "File Path harus dipilih";
            this.error = e;
        } else if (!storage) {
            e.storage = "Harus diisi";
            this.error = e;
        } else {
            formData.append("storageId", storage._id);
            formData.append("fileUpload", fileList[0]);

            var endpoint = 'stock-opnames';
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
                    if (result.status == 409) {
                        alert("Upload gagal!\n Ada beberapa data yang harus diperbaiki");
                    }
                    else if (result.status == 404) {
                        alert("Urutan format kolom CSV tidak sesuai.\n Format: Barcode, Nama Barang, Kuantitas Stock");
                    }
                    else if (result.status == 412) {
                        alert("Dokumen harus csv format");
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