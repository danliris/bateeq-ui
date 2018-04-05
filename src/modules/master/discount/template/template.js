import { bindable } from 'aurelia-framework';
var ItemLoader = require('../../../../loader/finishgood-loader-discount');

export class Template {
    activate(context) {
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

    itemChanged(e) {
        debugger
        if (this.data) {
            this.data.itemId = this.data.code_id ? this.data.code_id : {};
        }
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
}