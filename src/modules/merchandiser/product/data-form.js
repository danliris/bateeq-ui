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
    @bindable process;
    @bindable collections;
    @bindable materials;
    @bindable materialCompositions;
    @bindable seasons;
    @bindable counters;
    @bindable subCounters;
    @bindable categories;

    constructor() { }

    bind(context){
        console.log(context)
        this.context = context;
        this.data = this.context.data;
        this.process = this.data.process;
        this.collections = this.data.collections;
        this.materials = this.data.materials;
        this.materialCompositions = this.data.materialCompositions;
        this.seasons = this.data.seasons;
        this.counters = this.data.counters;
        this.subCounters = this.data.subCounters;
        this.categories = this.data.categories;
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    activate() {
    }

    attached() {
        var config = Container.instance.get(Config);
        this.imageUrl = `${config.getEndpoint("master").client.baseUrl}items/finished-goods/image/${this.data._id}`;
        console.log(this.data)
    }

    processChanged(newValue, oldValue) {
        console.log(newValue)
        var selectedSupplier = newValue;
        if (selectedSupplier) {
            if (selectedSupplier._id) {
                this.data.process = selectedSupplier;
                this.data.processname = selectedSupplier.name;
                //this.process = selectedSupplier;
            }
        } else {
            this.process = {};
            this.data.process = {};
            //this.data.processname = undefined;
        }
    }

    collectionsChanged(newValue, oldValue) {
        console.log(newValue)
        var selectedcollections = newValue;
        if (selectedcollections) {
            if (selectedcollections._id) {
                this.data.collections = selectedcollections;
                this.data.collectionsname = selectedcollections.name;
                //this.process = selectedSupplier;
            }
        } else {
            this.collections = {};
            this.data.collections = {};
            //this.data.processname = undefined;
        }
    }

    materialsChanged(newValue, oldValue) {
        console.log(newValue)
        var selectedmaterials = newValue;
        if (selectedmaterials) {
            if (selectedmaterials._id) {
                this.data.materials = selectedmaterials;
                this.data.materialssname = selectedmaterials.name;
                //this.process = selectedSupplier;
            }
        } else {
            this.materials = {};
            this.data.materials = {};
            //this.data.processname = undefined;
        }
    }
    materialCompositionsChanged(newValue, oldValue) {
        console.log(newValue)
        var selectedmaterialCompositions = newValue;
        if (selectedmaterialCompositions) {
            if (selectedmaterialCompositions._id) {
                this.data.materialCompositions = selectedmaterialCompositions;
                this.data.materialCompositionsname = selectedmaterialCompositions.name;
                //this.process = selectedSupplier;
            }
        } else {
            this.materialCompositions = {};
            this.data.materialCompositions = {};
            //this.data.processname = undefined;
        }
    }
    seasonsChanged(newValue, oldValue) {
        console.log(newValue)
        var selectedseasons = newValue;
        if (selectedseasons) {
            if (selectedseasons._id) {
                this.data.seasons = selectedseasons;
                this.data.seasonsname = selectedseasons.name;
                //this.process = selectedSupplier;
            }
        } else {
            this.seasons = {};
            this.data.seasons = {};
            //this.data.processname = undefined;
        }
    }
    countersChanged(newValue, oldValue) {
        console.log(newValue)
        var selectedcounters = newValue;
        if (selectedcounters) {
            if (selectedcounters._id) {
                this.data.counters = selectedcounters;
                this.data.countersname = selectedcounters.name;
                //this.process = selectedSupplier;
            }
        } else {
            this.counters = {};
            this.data.counters = {};
            //this.data.processname = undefined;
        }
    }
    subCountersChanged(newValue, oldValue) {
        console.log(newValue)
        var selectedsubCounters = newValue;
        if (selectedsubCounters) {
            if (selectedsubCounters._id) {
                this.data.subCounters = selectedsubCounters;
                this.data.subCountersname = selectedsubCounters.name;
                //this.process = selectedSupplier;
            }
        } else {
            this.subCounters = {};
            this.data.subCounters = {};
            //this.data.processname = undefined;
        }
    }
    categoriesChanged(newValue, oldValue) {
        console.log(newValue)
        var selectedcategories = newValue;
        if (selectedcategories) {
            if (selectedcategories._id) {
                this.data.categories = selectedcategories;
                this.data.categoriesname = selectedcategories.name;
                //this.process = selectedSupplier;
            }
        } else {
            this.categories = {};
            this.data.categories = {};
            //this.data.processname = undefined;
        }
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