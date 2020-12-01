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
        console.log(this.data);
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
      //console.log(this.data)
        var weight = 0;
        if (this.data.items) {
            for (var item of this.data.items) {
              //console.log(item);
                weight += parseFloat(item.weight || 0);
            }
        }
        return weight;
    }

    spkDocumentsInfo = {
        columns: [
            { header: "Packing List", value: "packingList" },
            { header: "Berat (Kg)", value: "weight" },
            { header: "Total Barang", value: "sendquantity" },
            { header: "Catatan", value: "remark" }
        ],
        onAdd: function () {
            this.data.items.push({});
        }.bind(this),
        onRemove: function (e) { console.log(e) }.bind(this)
    }
}
