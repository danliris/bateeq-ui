import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable data;
    @bindable error = {};
    @bindable readOnly = false;
    @bindable title;
    RDPTypeOptions = [{value: 'Percentage', label: 'Percentage'}, {value: 'Normal', label: 'Normal'}];
    @bindable viewType = true;
    RDPType = null;

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.RDPType = this.RDPTypeOptions[0];
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    selected(e) {
        this.data.type = this.RDPType;
    }
} 
