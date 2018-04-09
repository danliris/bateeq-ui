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

    discountMappingOptions = ["- discount -", "Diskon 1", "Diskon 2"];
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

    async storeCategoryChanged(e) {
        this.storeNameOptions = [];
        var selectedStoreCategory = e.srcElement.value;
        if (selectedStoreCategory !== this.data.storeCategory) {
            this.data.storeCategory = this.selectedStoreCategory;
        }
        var store = await this.changeStore(selectedStoreCategory);

        if (store.length > 0) {
            store.forEach(result => {
                this.storeNameOptions.push(result);
            })
        }
    }

    async discountChanged(e) {
        this.error ={};
        var selectedDiscount = e.srcElement.value;
        var notValidDiscount = await this.service.getAvailableDiscount(selectedDiscount);
        if (notValidDiscount) {
            if (notValidDiscount.length > 0) {
                this.error.discount = "Diskon Sudah Ada";
            }
        }
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

    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }
}