import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async bind() {
        this.data = { spkDocuments: [] };
        this.error = { spkDocuments: [] };
        this.expeditionServices = await this.service.getExpeditionServices();
    }

    dataChanged(newValue, oldValue) {
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() {
        this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                // debugger
                // console.log(this.error);
                // this.error = e;

                // for (var item in e.spkDocuments) {
                //     this.error.spkDocuments[item].code = e.spkDocuments[item].code;
                // }
                // console.log(this.error);
                this.error = e;
            })
    }
}