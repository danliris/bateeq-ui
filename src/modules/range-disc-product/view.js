import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    @bindable readOnlyCode = true;
    @bindable readOnlyName = true;
    @bindable readOnlyDescription = true;
    @bindable readOnlyType = true;
    @bindable readOnlyDiscFrom = true;
    @bindable readOnlyDiscTo = true;
    @bindable viewType = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.service.getById(id)
            .then(data => {
                this.data = data;
            });
    }

    list() {
        this.router.navigateToRoute('list');
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }

    update() {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }
}