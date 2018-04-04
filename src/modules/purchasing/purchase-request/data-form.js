import {inject, bindable, computedFrom} from 'aurelia-framework'
var UnitLoader = require('../../../loader/unit-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/purchasing-category-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    @bindable title;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    bind(context) {
        this.isDisable = false;
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    itemsColumns = [
        { header: "Barang", value: "product" },
        { header: "Jumlah", value: "quantity" },
        { header: "Satuan", value: "product.uom" },
        { header: "Keterangan", value: "remark" }
    ]

    unitChanged(e) {
        if (this.data.unit) {
            this.error.unit = "";
            this.isDisable = false;
            this.data.unitId = this.data.unit._id ? this.data.unit._id : {};
        } else {
            this.error.unit = "Unit cannot be empty";
            this.isDisable = true;
        }
            
    }

    budgetChanged(e) {
        if (this.data.budget) {
            this.error.budget = "";
            this.isDisable = false;
            this.data.budgetId = this.data.budget._id ? this.data.budget._id : {};
        } else {
            this.error.budget = "Budget cannot be empty";
            this.isDisable = true;
        }
    }

    categoryChanged(e) {
        if (this.data.category) {
            this.error.category = "";
            this.isDisable = false;
            this.data.categoryId = this.data.category._id ? this.data.category._id : {};
        } else {
            this.error.category = "Category cannot be empty";
            this.isDisable = true;
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    get budgetLoader() {
        return BudgetLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }
}