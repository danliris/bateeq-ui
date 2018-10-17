import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  constructor(router, service) {
    this.CustomeTitle = "Add Blocking Plan Sewing"
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback() {
    this.list();
  }

  saveCallback() {
    this.service
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {       
        this.error = e;      
      });
  }
}
