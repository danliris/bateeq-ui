import { inject, bindable, BindingEngine, computedFrom } from 'aurelia-framework';

@inject(BindingEngine)
export class ROSizeBreakdown {

    @bindable sizeQuantityStyle = {};
    controlOptions = {
        control: {
            length: 12
        }
    };
    disabled = true;

    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.context = context;
        this.data = this.context.data;
        this.columns = this.context.context.columns;
        this.options = this.context.options;
        this.readOnly = this.options.readOnly;

        this.sizeProps = this.columns.slice(2, this.columns.length - 1).map(column => {
            return column.value;
        });

        this.sizeProps.forEach(sizeProp => {
            this.bindingEngine.propertyObserver(this.data.SizeQuantity, sizeProp).subscribe(this.calculateTotal);
        })
    }

    calculateTotal = () => {
        this.data.Total = 0;
        Object.keys(this.data.SizeQuantity).forEach(sizeProp => {
            this.data.Total += this.data.SizeQuantity[sizeProp];
        });
    }
}