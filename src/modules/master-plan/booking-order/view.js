import { inject, Lazy, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;
  hasCancelConfirm = true;
  hasConfirm = true;
  hasBlockingPlan = false;
  expireBooking = false;

  readOnly = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    this.hasEdit = this.data.DetailConfirms.length <= 0;
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancel() {
    this.list();
  }

  delete() {
    this.service.delete(this.data).then(result => {
      this.list();
    });
  }

  view(params) {
    this.router.navigateToRoute(
      "view",
      { id: params.id },
      { replace: true, trigger: true }
    );
    this.activate(params);
  }

  edit() {
    this.router.navigateToRoute("edit", { id: this.data.Id });
  }

  confirm(event) {
    this.router.navigateToRoute("confirm", { id: this.data.Id });
  }

  cancelRemaining() {
    this.service.cancelRemaining(this.data).then(result => {
      this.list();
    });
  }
}
