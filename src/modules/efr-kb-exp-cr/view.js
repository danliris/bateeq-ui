import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    @bindable data = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { spkDocuments: [] };
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

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.expedition.toString = function () {
            return this.name;
        }

        this.data.spkDocuments = this.data.spkDocuments.map(spk => {
            spk.toString = function () {
                return this.code
            }
            spk.quantity = spk.items.reduce((sum, curr) => parseInt(sum || 0) + parseInt(curr.quantity || 0), 0);
            return spk;
        })

        if (this.data.spkDocuments.length > 0) {
            this.data.destination = this.data.spkDocuments[0].destination.name;
        } else {
            this.data.destination = "";
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    print() {
        this.service.getPdfById(this.data._id);
    }

}