import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './../service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.errorItems = false;
    }
    activate(params) {

    }
    bind() {
        this.data = { items: [] };
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) {
        this.errorItems = false;
        this.error = {};
        var dateNow = new Date();
        dateNow.setHours(0,0,0,0);

        if (this.data.supplierDoDate < dateNow) {
            this.error.supplierDoDate = "Date can not be less than current date";
        } else if(this.data.date < this.data.supplierDoDate) {
            this.error.date = "Date can not be less than delivery date";
        } else if(this.data.items.length < 1) {
            this.errorItems = true;
        } else {
            this.service.create(this.data)
                .then(result => {
                    alert("Data berhasil dibuat");
                    this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }
}