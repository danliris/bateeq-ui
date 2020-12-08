import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  isEdit = true;
  hasCancel = true;
  hasSave = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getMembershipById(id);
  }

  cancel(event) {
    this.router.navigateToRoute("view", { id: this.data.id });
  }

  save(event) {
    console.log(this.data);
    this.service.update(this.data)
      .then(result => {
        this.router.navigateToRoute('view', { id: this.data.id });
      })
      .catch(e => {
        this.error = e;
      })
  }
}
