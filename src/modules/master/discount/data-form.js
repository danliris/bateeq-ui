import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { Service } from "./service";
var StoreLoader = require('../../../loader/store-loader');

@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;

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

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.itemsColumns = {
            columns: ["RO"],
            onAdd: () => {
                this.data.items.push({});
            }, options: {
                filter: {}
            }
        }
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        if (this.data.stores) {
            if (this.data.stores.length > 0) {
                this.storeNameOptions = [];
                this.storeNameOptions.push("ALL");
            } else {
                this.storeNameOptions = [];
                this.storeNameOptions.push(this.data.stores.name);
            }
        }
        this.detailOptions = {};
        this.detailOptions.innerData = this.data;
    }

    async storeCategoryChanged(e) {

        if (this.storeNameOptions.length > 0) {
            this.storeNameOptions = [];
        }

        var selectedStoreCategory = e.srcElement.value;

        if (selectedStoreCategory !== this.data.storeCategory) {
            this.data.storeCategory = this.selectedStoreCategory;
        }

        this.storeNameOptions = await this.changeStore(selectedStoreCategory);
    }

    changeStore(storeCategory) {
        var getStore = StoreLoader(storeCategory);
        var storeName = [];
        return Promise.all(getStore)
            .then(result => {
                if (storeCategory !== "ALL") {
                    storeName = result.map(store => {
                        return store.name;
                    });
                    storeName.splice(0, 0, "ALL");
                } else {
                    storeName.push("ALL");
                }
                return Promise.resolve(storeName);
            });
    }
}