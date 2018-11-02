import { inject } from "aurelia-framework";
import { Service } from "../service";

@inject(Service)
export class DetailConfirm {
  controlOptions = {
    control: {
      length: 12
    }
  };

  constructor(service) {
    this.service = service;
  }

  activate(context) { 
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }
}
