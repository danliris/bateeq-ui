import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {

    @bindable isChange;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.isChange = false;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        if (!this.data.stores || this.data.stores == undefined || this.data.stores == []) {
            this.data.stores = "";
        }
        this.data.password = "";

        if ((this.data.profile.dob != undefined && this.data.profile.dob != "")
            && (this.data.profile.gender != undefined && this.data.profile.gender != "")
            && (this.data.profile.email != undefined && this.data.profile.email != "")) {
            this.isChange = true;
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit() {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    changePassword() {
        this.router.navigateToRoute('changePassword', { id: this.data._id })
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}
