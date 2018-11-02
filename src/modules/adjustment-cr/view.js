import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.service.getById(id)
            .then(data => {
                this.data = data;
            })
    }

    list() {
        this.router.navigateToRoute('list');
    }

    print() {
        this.service.getPdfById(this.data._id);
    }

    exportToExcel() {
        this.service.generateExcel(this.data._id);
    }
}
