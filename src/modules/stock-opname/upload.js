import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var StorageLoader = require('../../loader/nstorage-loader');


@inject(Router, Service, Element)
export class Create {

    constructor(router, service, element) {
        this.router = router;
        this.service = service;
        this.element = element;
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

    download() {
        var storage = this.data.storage;
        var endpoint = `stock-opname/by-user/download?source=${storage.code}`;
        var request = {
          method: 'GET'
        };
    
        var getRequest = this.service.endpoint.client.fetch(endpoint, request);
        this.service._downloadFile(getRequest);
        this.service.publish(getRequest);
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
            formData.append("fileUpload", fileList[0]);

            var endpoint = `warehouse/upload-so/upload?source=${storage.code}`;
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
                    // if (result.status == 409 || result.status == 200) {
                    //     var getRequest = this.service.endpoint.client.fetch(endpoint, request);
                    //     this.service._downloadFile(getRequest);
                    //     this.service.publish(getRequest);
                    //     alert("Upload gagal!\n Ada beberapa data yang harus diperbaiki");
                    // }
                    if (result.status == 404) {
                        var getRequest = this.service.endpoint.client.fetch(endpoint, request);
                        this.service._downloadFile(getRequest);
                        this.service.publish(getRequest);
                        alert("Upload gagal!\n Ada beberapa data yang harus diperbaiki");
                    }
                    else if (result.status == 400) {
                        alert("Urutan format kolom CSV tidak sesuai.\n Format: Barcode, Nama Barang, Kuantitas Stock");
                        this.list();
                    }
                    else if (result.status == 412) {
                        alert("Dokumen harus csv format");
                    }
                    else if(result.status == 500){
                        var getRequest = this.service.endpoint.client.fetch(endpoint, request);
                        this.service._downloadFile(getRequest);
                        this.service.publish(getRequest);
                        alert("Terjadi kesalahan pada sistem");
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