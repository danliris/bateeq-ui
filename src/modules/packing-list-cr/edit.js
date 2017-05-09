import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        for (var i = 0; i < this.data.items.length; i++) {
            var result = await this.service.getDataInventory(this.data.source._id, this.data.items[i].itemId);
            if (result != undefined) {
                this.data.items[i].availableQuantity = result.quantity;
                this.data.items[i].price = parseInt(result.item.domesticSale) * parseInt(this.data.items[i].quantity);
            }
        }
    }

    view() {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        this.service.update(this.data)
            .then(result => {
                this.view();
            })
            .catch(e => {
                this.error = e;
            })
    }

    saveDraft() {
        this.service.updateDraft(this.data)
            .then(result => {
                this.view();
            })
            .catch(e => {
                this.error = e;
            })
    }
}
