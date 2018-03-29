import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class CostCalculationRetailMaterialFooter {
    activate(context) {
        this.context = context;
    }

    get totalMaterial() {
        let totalMaterial = 0;
        for (let item of this.context.items){
            if (item.data){
                totalMaterial += Number(item.data.Total);
            }
        }
        return totalMaterial;
    }
}