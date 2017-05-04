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

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.expedition.toString = function(){
            return this.name;
        }

        this.data.spkDocuments = this.data.spkDocuments.map(spk => {
                spk.toString = function () {
                    return this.code
                }
                if (spk.items.length > 1) {
                    spk.quantity = spk.items.reduce((prev, curr) => prev.quantity + curr.quantity);
                } else {
                    spk.quantity = spk.items[0].quantity;
                }
                return spk;
            })
    }

    list() {
        this.router.navigateToRoute('list');
    }

    print() {
        console.log(this.data._id);
        this.service.getPdfById(this.data._id);
    }

}