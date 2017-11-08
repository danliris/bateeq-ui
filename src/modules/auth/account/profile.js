import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom } from 'aurelia-framework';

@inject(Router, Service)
export class Profile {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    genders = ["Male","Female"];

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
}
