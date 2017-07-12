import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
var ProcessLoader = require('../../../loader/process-loader');
var SeasonsLoader = require('../../../loader/season-loader');
var SubCountersLoader = require('../../../loader/sub-counter-loader');
var CollectionsLoader = require('../../../loader/collection-loader');
var CategoriesLoader = require('../../../loader/category-loader');
var CountersLoader = require('../../../loader/counter-loader');
var MaterialCompositionsLoader = require('../../../loader/material-composition-loader');
var MaterialsLoader = require('../../../loader/material-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor() { }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    activate() {
    }

    attached() {
        var config = Container.instance.get(Config);
        this.imageUrl = `${config.getEndpoint("master").client.baseUrl}items/finished-goods/image/${this.data._id}`;
    }

    processChanged(e) {
        if (this.data.processDoc)
            this.data.processDocId = this.data.processDoc._id ? this.data.processDoc._id : {};
    }

    get ProcessLoader() {
        return ProcessLoader;
    }
    get MaterialsLoader() {
        return MaterialsLoader;
    }
    get MaterialCompositionsLoader() {
        return MaterialCompositionsLoader;
    }
    get CollectionsLoader() {
        return CollectionsLoader;
    }
    get SubCountersLoader() {
        return SubCountersLoader;
    }
    get CountersLoader() {
        return CountersLoader;
    }
    get SeasonsLoader() {
        return SeasonsLoader;
    }

    get CategoriesLoader() {
        return CategoriesLoader;
    } 
} 