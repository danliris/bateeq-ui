import { inject, bindable, computedFrom } from 'aurelia-framework';

export class CostCalculationRetailMaterial {

    controlOptions = {
        control: {
            length: 12
        }
    };

    async activate(context) {
        this.context = context;
        this.data = this.context.data;
        this.options = this.context.options;
        this.readOnly = true;
    }
}
