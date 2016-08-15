import {inject, bindable, bindingMode} from 'aurelia-framework';
var HorseyJs = require('horsey');

@inject(Element)
export class Horsey {
    @bindable src;
    @bindable filter;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) selection;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) map;

    @bindable options;
    constructor(element) {
        this.element = element;
    }

    attached() {
        this.selection = {};
        var uri = `${this.src}?${this.filter ? this.filter : 'keyword'}`;
        HorseyJs(this.element.querySelector('input'), {
            predictNextSearch: info => {
                this.selection = this.options.selection ? info.selection[this.options.selection] : info.selection;
                this.value = info.selection[this.options.value];
                this.text = info.selection[this.options.label]
            },
            source: (data, done) => {
                fetch(`${uri}=${data.input}`)
                    .then(result => {
                        result.json().then(json => {
                            done(null, [{
                                list: this.map ? this.map(json) : json.data
                            }])
                        })
                    });
            },
            getText: this.options.label,
            getValue: this.options.value
        })
    }
}