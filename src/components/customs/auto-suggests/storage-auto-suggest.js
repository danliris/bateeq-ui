import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import StorageAutoSuggestReact from './react/storage-auto-suggest-react.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('storage-auto-suggest')
export default class StorageAutoSuggest extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = StorageAutoSuggestReact;
    }
} 