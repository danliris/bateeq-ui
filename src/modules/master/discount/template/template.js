import { bindable } from 'aurelia-framework';
var ItemLoader = require('../../../../loader/finishgood-loader-discount');
import { Service } from './../service';
import { inject, Lazy } from 'aurelia-framework';
import { debug } from 'util';

@inject(Service)
export class Template {
    @bindable code;
    @bindable error = {};

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.code = context.data.item;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if (!this.data.itemId) {
            this.data.itemId = {};
        }
    }

    get itemLoader() {
        return ItemLoader;
    }

    async codeChanged(newValue) {
        this.error = {};
        var item = await this.service.getItemByCode(newValue.code);
        debugger
        if (item.length > 0) {
            this.error.code = "Produk sudah digunakan, gunakan Produk yg lain";
        } else {
            this.data.itemId = newValue._id;
            this.data.item = newValue;
        }
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
}