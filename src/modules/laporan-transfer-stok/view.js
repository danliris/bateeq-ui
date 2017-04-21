import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate(params) {
        var storageId = params.storageId;
        var itemId = params.itemId; 
        this.service.getAllMovement(storageId, itemId)
            .then(data => {
                this.data = data;
                var moment = require('moment');
                for (var obj of this.data) {
                    obj.date = moment(obj.date, "YYYY-MM-DDTHH:mm:SSSZ").format("DD MMM YYYY - HH:mm:SS")
                }
            })
    }

    list() {
        this.router.navigateToRoute('list');
    }
}
