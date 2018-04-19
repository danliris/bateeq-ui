import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
var ItemLoader = require('../../../../loader/finishgood-loader-discount');

@inject(Service)
export class ROItemDetails {

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        
        if (this.data.code) {
            if (this.data.code._id) {
                this.data = this.data.code;
            }
        }
        
        if (this.data) {
            var error = this.data.error;

            if (error) {
                this.error = {};
                this.error['code'] = this.data.error;
            }
        }
    }

    async codeChanged(e) {
        this.error = {};
        var item = await this.service.getItemByCode(e.srcElement.value);
        if (item.length > 0) {
            this.error.code = "Produk sudah digunakan, gunakan Produk yg lain";
        } else {
            this.data = this.data.code;
        }
    }

    get itemLoader() {
        return ItemLoader;
    }
}