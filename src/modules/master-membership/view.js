import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { Dialog } from "../../au-components/dialog/dialog";
import numeral from "numeral";

@inject(Router, Dialog, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;

  constructor(router, dialog, service) {
    this.router = router;
    this.dialog = dialog;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getMembershipById(id);
  }

  cancel(event) {
    this.router.navigateToRoute("list");
  }

  edit(event) {
    this.router.navigateToRoute("edit", { id: this.data.id });
  }

  delete(event) {
    this.dialog
      .prompt("Are you sure want to delete this data?", "Delete this data")
      .then((response) => {
        if (response.ok) {
          this.service.delete(this.data)
              .then(result => {
                  this.list();
              });
          this.router.navigateToRoute("list");
        }
      });
  }
}
