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
    addSourceItem() {           
        var item = []; 
        this.data.config.source.push(item); 
    } 
    
    removeSourceItem(item) { 
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
    addDestinationItem() {           
        var item = []; 
        this.data.config.destination.push(item); 
    } 
    
    removeDestinationItem(item) { 
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
    
    addItem() {           
        var item = {};
        item.articleVariantId = '';
        this.data.config.source.value.push(item); 
    } 
    
    removeItem(item) { 
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
} 