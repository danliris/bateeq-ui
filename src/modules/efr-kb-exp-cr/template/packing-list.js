import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from '../service';
var PackingListLoader = require('../../../loader/packing-list-loader');

@inject(Router, Service)
export class PackingList {
    @bindable packingListReadOnly = false;

    constructor(router, service) {
        this.service = service;
    }

    spkDocument = {};

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;

        this.packingListReadOnly = this.data.code && this.data.code != '';
        // if(this.options.readOnly)
        this.isDetail = this.options.readOnly;
    }

    get packingListLoader() {
        return PackingListLoader;
    }

    async packingListChangeCallback(e) {
        if (this.data.packingList) {
            var temp = this.data.packingList;
            this.data._id = temp._id;
            this.data.date = temp.date;
            this.data.reference = temp.reference;
            this.data.sourceId = temp.sourceId;
            this.data.source = temp.source;
            this.data.destinationId = temp.destinationId;
            this.data.destination = temp.destination;
            this.data.items = temp.items;
            this.data.isDraft = temp.isDraft;
            this.data.packingList = temp.packingList;
            this.data.password = temp.password;
            this.data.isReceived = temp.isReceived;
            this.data.weight = 0;
            this.data.quantity = temp.quantity;
            this.data.notes = '';
            this.data.code = temp.code;

            var stock = [];
            for (var item of this.data.items) {
                item.sendQuantity = item.quantity;
                var a = await this.service.getStock(this.data.sourceId, item.itemId);
                if (a) {
                    item.quantityStock = a.quantity;
                }
            }
            this.packingListReadOnly = true;
        }
    }

    test = ""
    refresh() {
        this.test = JSON.stringify(this.error)
    }
}