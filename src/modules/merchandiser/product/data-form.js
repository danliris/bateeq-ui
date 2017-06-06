import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor() { }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    activate() {
    }

    attached() { 
        var config = Container.instance.get(Config);
        this.imageUrl = `${config.getEndpoint("master").client.baseUrl}items/finished-goods/image/${this.data._id}`;
    }

} 