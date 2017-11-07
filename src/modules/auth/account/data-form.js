import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    isCreate = {};

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
        if (this.router.currentInstruction.config.name === "create")
            this.isCreate = true;
        else
            this.isCreate = false;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }
} 
