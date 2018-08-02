import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  hasSave = true;
  hasCancel = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancel() {
    this.list();
  }

  save() {
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
