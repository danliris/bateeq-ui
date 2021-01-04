import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import TypeaheadReact from './react/product-typeahead-react.jsx';
import BaseTypeahead from '../../form/basic/base-typeahead';

@noView()
@inject(Element)
@customElement('product-typeahead')
export default class ProductTypeahead extends BaseTypeahead {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = TypeaheadReact;
    }
} 