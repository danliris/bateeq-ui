import { inject, bindable, BindingEngine, computedFrom } from 'aurelia-framework';
const sizeLoader = require('../../../../loader/size-md-loader');

@inject(BindingEngine)
export class ROGarmentSizeBreakdownDetail {
    controlOptions = {
        control: {
            length: 12
        }
    };

    get sizeLoader() {
        return sizeLoader;
    }
    
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.context = context;
        this.data = this.context.data;
        this.columns = this.context.context.columns;
        this.options = this.context.options;
        this.readOnly = this.options.readOnly;
    }
}