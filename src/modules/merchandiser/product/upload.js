import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

@inject(Router, Service)
export class Upload {
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
            var config = Container.instance.get(Config);
            var endpoint = `${config.getEndpoint("inventory").client.baseUrl}upload-finishgoods`;
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
                    else if (result.status != 201) {
                        alert(result.statusText);
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
