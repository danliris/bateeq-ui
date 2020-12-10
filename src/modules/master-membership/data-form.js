import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { Service } from "./service";

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
  @bindable readOnly;
  @bindable data = {};
  @bindable error = {};
  @bindable title;
  @bindable membershipTierSources = [];

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  // membershipTierSources = ["Silver", "Gold", "Platinum"];

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() != "";
  }
}
