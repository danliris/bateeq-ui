import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
var FinishedItemLoader = require("./../../../../loader/finishgood-loader-discount");

@inject(Service)
export class ROItemDetails {

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
    }
}