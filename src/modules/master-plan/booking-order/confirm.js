import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import moment from "moment";

@inject(Router, Service)
export class Confirm {
  hasSave = true;
  hasCancel = true;
  isConfirmBooking = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  bind() {
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  view() {
    this.router.navigateToRoute(
      "view",
      { id: this.data.Id },
      { replace: true, trigger: true }
    );
  }

  cancel() {
    this.router.navigateToRoute("view", { id: this.data.Id });
  }

  save() {
    let doSave = true;
    if (this.data.DetailConfirms) {
      let confirmMessage = "";
      let total = 0;
      for (var item of this.data.DetailConfirms) {
        let deliveryDate = moment(item.DeliveryDate);
        let confirmDate = moment(item.ConfirmDate);
        let diff = deliveryDate.diff(confirmDate, "days");
        if (diff <= 45 && item.RO) {
          confirmMessage += `Tanggal Pengiriman RO ${
            item.RO
          } <= 45 hari dari Tanggal Confirm \n`;
        }
        total += item.Total;
      }
      if (total > this.data.OrderQuantity) {
        confirmMessage +=
          "\nTotal jumlah order pada detail confirm lebih banyak dari jumlah order pada booking order\n";
      }
      if (confirmMessage !== "") {
        confirmMessage += "\nLanjutkan?";
        if (!confirm(confirmMessage)) {
          doSave = false;
        }
      }
    }
    if (doSave === true) {
      this.service
        .update(this.data)
        .then(result => {
          this.cancel();
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
