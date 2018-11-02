import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {

    }
    bind() {
        this.data = { Items: [] };
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
        this.service.getByYearAndUnitCode(this.data)
            .then(isExsist => {
                if (isExsist == null) {
                    this.service.create(this.data)
                        .then(result => {
                            alert("Successful to create data");
                            this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                        })
                        .catch(e => {
                            this.error = e;
                        })
                } else {
                    alert("Year " + isExsist.Year + " with Unit Code " + isExsist.UnitCode + " is already exists");
                }
            });
    }
}