import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    this.data.WorkSchedules.forEach(element => {
      element.isHasRoViewing = true;
    });
  }

  cancelCallback() {
    this.router.navigateToRoute("view", { id: this.data.Id });
  }

  saveCallback() {
    this.service
      .update(this.data)
      .then(result => {
        this.router.navigateToRoute("view", { id: this.data.Id });
      })
      .catch(e => {
        this.error = e;
      });
  }
}
