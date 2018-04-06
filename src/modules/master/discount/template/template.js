import { bindable } from 'aurelia-framework';
var ItemLoader = require('../../../../loader/finishgood-loader-discount');

export class Template {
    @bindable code;

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

    codeChanged(newValue) {
        if (newValue) {
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