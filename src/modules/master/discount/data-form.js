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
        this.error = this.context.error;
        console.log(this.context);
        if (this.data.store) {
            // if (this.data.stores.length > 0) {
            //     this.storeNameOptions = [];
            //     this.storeNameOptions.push("ALL");
            // } else {
            //     this.storeNameOptions = [];
            //     this.storeNameOptions.push(this.data.stores.name);
            // }

            this.storeNameOptions.push(this.data.store.name)
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

        if(selectedStoreCategory == "ALL"){
            selectedStoreCategory = "";
        }

        this.service.getStorebyCategory(selectedStoreCategory)
        .then(result => {
            for(var datas of result){
                this.storeNameOptions.push(datas.Name);
            }
            this.storeNameOptions.splice(0, 0, "ALL")
            //console.log(result);
            
        });
    }

    // changeStore(storeCategory) {
    //     this.service.getStorebyCategory(storeCategory).then(result => {
    //         var storeName = [];

    //     })
        // var getStore = getStorebyCategory(storeCategory);
        // var storeName = [];
        // return Promise.all(getStore)
        //     .then(result => {
        //         if (storeCategory !== "ALL") {
        //             storeName = result.map(store => {
        //                 return store.name;
        //             });
        //             storeName.splice(0, 0, "ALL");
        //         } else {
        //             storeName.push("ALL");
        //         }
        //         return Promise.resolve(storeName);
        //     });
    
}