import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
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

    upload() {
        var formData = new FormData();
        var fileInput = document.getElementById("fileCsv");
        var fileList = fileInput.files;
        var source = this.data.source;
        var destination = this.data.destination;
        var date = this.data.date;
        formData.append("sourceId", source._id);
        formData.append("destinationId", destination._id);
        formData.append("date", date);
        formData.append("fileUpload", fileList[0]);

        var uri = require('../../host').merchandiser + '/upload/pba';;
        var request = {
            method: 'POST',
            headers: {
            },
            body: formData
        };
        fetch(uri, request)
            .then(response => {
                alert("Data Berhasil Diupload");
                this.router.navigateToRoute('list');
            })
    }
}
