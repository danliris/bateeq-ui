import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

@inject(BindingEngine)
export class ROSizeBreakdownFooter {

    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.context = context;
        this.columns = this.context.columns;
        this.items = this.context.items;
        this.disabled = true;
        this.sizeQuantityTotal = {};
        this.subscription = {
            items: {},
            total: {},
            sizeQuantity: {}
        }
        
        if (this.items.length > 0) {
            this.itemsModified();
            this.totalChanged();
            this.sizeQuantityModified();
        }
        else {
            this.refreshProps();
        }

        this.subscription.items = this.bindingEngine.collectionObserver(this.items).subscribe(this.itemsModified);
    }

    refreshProps(){
        this.sizeProps = this.columns.slice(2, this.columns.length - 1).map(column => {
            return column.value;
        });
        this.sizeProps.forEach(prop => {
            this.sizeQuantityTotal[prop] = 0;
        })
    }

    itemsModified = () => {
        this.refreshProps();
        this.items.forEach((value, index) => {
            this.subscription.total[index] = this.bindingEngine.propertyObserver(value.data, 'Total').subscribe(this.totalChanged);
            this.subscription.sizeQuantity[index] = {};
            this.sizeProps.forEach(prop => {
                this.subscription.sizeQuantity[index][prop] = this.bindingEngine.propertyObserver(value.data.SizeQuantity, prop).subscribe(this.sizeQuantityModified);
            })
        })
    }

    totalChanged = () => {
        this.total = 0;
        this.items.forEach(value => {
            this.total += value.data.Total;
        })
    }

    sizeQuantityModified = () => {
        this.sizeProps.forEach(prop => {
            this.sizeQuantityTotal[prop] = 0;
            this.items.forEach(item => {
                this.sizeQuantityTotal[prop] += item.data.SizeQuantity[prop];
            })
        })
    }
}