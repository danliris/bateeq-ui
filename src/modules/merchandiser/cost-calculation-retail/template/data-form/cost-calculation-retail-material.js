import { inject, bindable, computedFrom } from 'aurelia-framework';
import numeral from 'numeral';
const categoryLoader = require('../../../../../loader/category-md-loader');
const materialLoader = require('../../../../../loader/material-md-loader');
const uomLoader = require('../../../../../loader/uom-md-loader');

export class CostCalculationRetailMaterial {

    controlOptions = {
        control: {
            length: 12
        }
    };

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly || false;
        this.disabled = true;
    }

    bind(){
        if (this.data.Category) {
            this.thisCategory = this.data.Category;
        }
    }

    @bindable thisCategory;
    thisCategoryChanged(newValue) {
        if (newValue) {
            this.data.categoryIsFilled = true;
        }
        else {
            this.data.categoryIsFilled = false;
        }
        this.data.Category = newValue;
        this.categoryIsFilled = this.data.categoryIsFilled;
    }

    get categoryLoader() {
        return categoryLoader;
    }

    thisCategoryText = (thisCategory) => { 
        return thisCategory.SubCategory ? `${thisCategory.Name} - ${thisCategory.SubCategory}` : `${thisCategory.Name}`;
    }

    get materialLoader() {
        return materialLoader;
    }

    get filterMaterial() {
        return { "CategoryId": this.data.Category ? this.data.Category.Id : 0 }
    }

    get satuanQuantityLoader() {
        return uomLoader;
    }

    get satuanPriceLoader() {
        return uomLoader;
    }

    @computedFrom('data.Quantity', 'data.Price', 'data.Conversion')
    get total() {
        this.data.Total = (this.data.Quantity && this.data.Quantity !== 0) && (this.data.Conversion && this.data.Conversion !== 0) && (this.data.Price && this.data.Price !== 0) ? parseFloat((this.data.Price / this.data.Conversion * this.data.Quantity).toFixed(2)) : 0;
        return numeral(this.data.Total).format("0,0.00");
    }
}
