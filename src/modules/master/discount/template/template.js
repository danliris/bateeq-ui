import { bindable } from 'aurelia-framework'
var ItemLoader = require('../../../../loader/finished-goods-loader');

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
        if (this.data.item)
            this.data.itemId = this.data.item._id ? this.data.item._id : {};
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
}