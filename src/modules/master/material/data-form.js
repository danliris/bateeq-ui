import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
const CategoryLoader = require('../../../loader/category-md-loader');

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable isFabric = false;
    @bindable category;
    @bindable data = {};
    @bindable error = {};
    customOptions = {
        label: {
            length: 5
        }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        if (this.context.router.currentInstruction.config.name !== "create") {
            this.category = this.data.Category;
            this.isFabric = this.data.Category.Name.toUpperCase() === "FAB" ? true : false;
        }
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    categoryText = (category) => {
        return `${category.Name} - ${category.SubCategory}`;
    }

    categoryChanged(newValue, oldValue) {
        if (this.context.router.currentInstruction.config.name === "create") {
            if (newValue) {
                this.isFabric = newValue.Name.toUpperCase() === "FAB" ? true : false;
            } else {
                this.isFabric = false;
            }
            this.data.Category = this.category ? this.category : null;
        }
    }
} 
