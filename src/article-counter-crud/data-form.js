import {inject, bindable} from 'aurelia-framework';

export class DataForm {
    @bindable data = {};
    @bindable error = {};

    constructor() {

    }

    activate() {
        console.log('data-form-activated');
    }

    attached() {
        console.log('data-form-attached');
        console.log(this.data);
    }

    addItem() {
        var newItem = { code: '', name: '', description: '' };
        this.data.subCounters = this.data.subCounters ? this.data.subCounters : [];
        this.data.subCounters.push(newItem);
        console.log(this.data);
    }

    removeItem(item) { 
        var itemIndex = this.data.subCounters.indexOf(item);
        this.data.subCounters.splice(itemIndex, 1);
    }
} 