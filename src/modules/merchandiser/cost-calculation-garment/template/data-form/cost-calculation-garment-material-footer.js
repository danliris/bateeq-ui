import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class CostCalculationGarmentMaterialFooter {
    activate(context) {
        this.context = context;
    }

    get subTotal() {
        let subTotal = 0;
        for (let item of this.context.items) {
            if (item.data) {
                subTotal += item.data.Total ? Number(item.data.Total) : 0;
            }
        }
        return subTotal;
    }
}