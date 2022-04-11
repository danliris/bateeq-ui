import React from "react";
import ReactDOM from "react-dom";
import {
  customElement,
  inject,
  bindable,
  bindingMode,
  noView,
} from "aurelia-framework";
import BaseTypeahead from "./base-typeahead";

@noView()
@inject(Element)
@customElement("typeahead")
export default class Typeahead extends BaseTypeahead {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  constructor(element) {
    super(element);
  }
}
