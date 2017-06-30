import {inject, Lazy, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    @bindable readOnlyCode = true;
    @bindable error = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() {
        this.service.update(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                this.error = e;
            })
    }
}