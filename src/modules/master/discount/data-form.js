import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework';
import { Service } from "./service";
var StoreLoader = require('../../../loader/store-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;

    discountMappingOptions = ["- discount -","Diskon 1", "Diskon 2"];
    storeCategoryOptions = ["- categories -", "ALL", "DEPT STORE", "STAND ALONE", "FACTORY OUTLET", "MARKET PLACE"];
    storeNameOptions = ["- stores -"];

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    itemsColumns = [
        { header: "Barcode", value: "code" },
        { header: "RO", value: "article.realizationOrder" },
        { header: "Nama Produk", value: "name" },
        { header: "Keterangan", value: "remark" }
    ]

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    storeCategoryChanged(e) {
        var selectedStoreCategory = e.srcElement.value;
        if (selectedStoreCategory !== this.data.storeCategory) {
            this.data.storeCategory = this.selectedStoreCategory;
        }

        this.changeStore(selectedStoreCategory);
    }

    changeStore(storeCategory) {
        var getStore = StoreLoader(storeCategory);

        this.storeNameOptions = [];
        return Promise.all(getStore)
        .then(result => {
            this.storeNameOptions = result.map(store => {
                return store.name;
            });
        });
    }

    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }
}