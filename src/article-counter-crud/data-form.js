import {inject, bindable} from 'aurelia-framework';

export class DataForm {
    @bindable data = {};
    @bindable error = {};

    constructor() {

    }

    activate() {
        
    }

    attached() {
        
    }

    addItem() {
        var newItem = { code: '', name: '', description: '' };
        this.data.subCounters = this.data.subCounters ? this.data.subCounters : [];
        this.data.subCounters.push(newItem);
    }

    removeItem(item) { 
        var itemIndex = this.data.subCounters.indexOf(item);
        this.data.subCounters.splice(itemIndex, 1);
    }
} 