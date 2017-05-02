import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
        // this.service.getExpeditionServices().then(result => {
        //     this.expeditionServices = result;
        // })
    }


    async attached() {
        if (!this.readOnly) {
            this.service.getExpeditionServices().then(result => {
                this.expeditionServices = result;
            })
        }
    }

    test = "";
    test2 = "";

    refresh() {
        this.test = JSON.stringify(this.error);
    }
    refresh2() {
        this.test2 = JSON.stringify(this.data);
    }

    get sumWeight() {
        var weight = 0;
        if (this.data) {
            for (var item of this.data.spkDocuments) {
                weight += parseFloat(item.weight || 0);
            }
        }
        return weight;
    }

    spkDocumentsInfo = {
        columns: [
            { header: "Packing List", value: "code" },
            { header: "Berat (Kg)", value: "weight" },
            { header: "Total Barang", value: "quantity" },
            { header: "Catatan", value: "notes" }
        ],
        onAdd: function () {
            this.data.spkDocuments.push({});
        }.bind(this),
        onRemove: function (e) { console.log(e) }.bind(this)
    }
}