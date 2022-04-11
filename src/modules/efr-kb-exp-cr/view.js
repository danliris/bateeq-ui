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
            { header: "Total Barang", value: "sendquantity" },
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
        this.data.expeditionService.toString = function () {
            return this.name;
        }

        this.data.items = this.data.items.map(spk => {
            spk.toString = function () {
                return this.spkDocsViewModel.code
            }
            spk.quantity = spk.details.reduce((sum, curr) => parseInt(sum || 0) + parseInt(curr.sendQuantity || 0), 0);
            return spk;
        })

        if (this.data.items.length > 0) {
            this.data.destination = this.data.items[0].spkDocsViewModel.destination.name;
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
