import { bindable, bindingMode, noView, inject, computedFrom, children, customElement } from "aurelia-framework";
import { BindingEngine } from 'aurelia-binding';
import dispatchCustomEvent from "../../../lib/dispatch-custom-event";

@inject(Element, BindingEngine)
@customElement("au-collection")
export class Collection {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) items;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) errors;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable options;

  @bindable title = null;
  @bindable headerTemplate = null;
  @bindable itemTemplate = null;
  @bindable footerTemplate = null;
  @bindable columns;
  @bindable responsive = false;

  defaultOptions = {
    control: {
      length: 12
    }
  }

  @bindable add;
  @bindable remove;
  @bindable checkAll;

  itemsChanged() {
    this.buildContext();
  }
  errorsChanged() {
    this.buildContext();
  }

  @computedFrom("columns", "columns.length")
  get __columns() {
    if (!this.__hasColumns)
      return [];

    return this.columns.map(column => {
      var columnType = typeof column;
      if (columnType !== "string" && columnType !== "object")
        throw "only string or object type allowed as a column";

      if (columnType === "string")
        return { header: column, value: column };
      else
        return column;
    });
  }

  @computedFrom("columns", "columns.length")
  get __hasColumns() {
    return this.columns.constructor === Array && this.columns.length > 0;
    // return this.__columns.length > 0;
  }

  @computedFrom("context", "context.items", "context.items.length")
  get __items() {
    return this.context.items;
  }

  @computedFrom("__items", "__items.length")
  get __hasItems() {
    return this.__items.constructor === Array && this.__items.length > 0;
  }

  @computedFrom("add", "remove")
  get buttons() {
    var buttons = {
      add: this.add && true,
      remove: this.remove && true
    }
    return buttons;
  }

  constructor(element, bindingEngine) {
    this.element = element;
    this.bindingEngine = bindingEngine;
  }

  bind() {
    this.items = this.items || [];
    this.errors = this.errors || [];
    this.data = this.data || [];
    this.columns = this.columns || [];
    this.buildContext();

    let itemSubscription = this.bindingEngine.collectionObserver(this.items)
      .subscribe(splices => {
        this.buildContext();
      });
    let errorSubscription = this.bindingEngine.collectionObserver(this.errors)
      .subscribe(splices => {
        this.buildContext();
      });
  }

  buildContext() {
    this.context = this.context || {};
    this.context.columns = this.columns;
    this.context.options = this.options;
    this.context.items = this.context.items || [];

    var mapped = (this.items || []).map((item, index) => {
      var error = this.errors ? this.errors[index] : null;
      return {
        data: item,
        error: error,
        options: {
          readOnly: this.readOnly && true
        },
        context: this.context
      }
    });
    this.context.items.splice(0, this.context.items.length);
    Array.prototype.push.apply(this.context.items, mapped);
  }

  onadd(event) {
    if (this.add && typeof this.add === "function")
      this.add(event);
  }

  checkAllCallBack($event) {
    dispatchCustomEvent("checkall", this.element, $event);
  }

  onremove(item) {
    var itemIndex = this.items.indexOf(item);
    this.items.splice(itemIndex, 1);

    if (this.remove && typeof this.remove === "function") {
      let event;
      var eventName = "remove";
      if (window.CustomEvent) {
        event = new CustomEvent(eventName, {
          detail: item,
          bubbles: true
        });
      } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, {
          detail: item
        });
      }
      this.remove(event);
    }
  }
}