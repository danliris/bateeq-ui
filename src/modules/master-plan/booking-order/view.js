import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  hasCancel = true;
  hasBlockingPlan = false;
  readOnly = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    const expired = this.data.StatusRemainingOrder.toUpperCase() === "EXPIRED";
    const nothingConfirmed = this.data.DetailConfirms.length <= 0;
    const notAllConfirmed =
      this.data.StatusTotalConfirm.toUpperCase() === "BELUM CONFIRM" ||
      Number(this.data.StatusTotalConfirm) < 0;
    const hasRemaining = this.data.StatusRemainingOrder.toUpperCase() !== "-";
    this.hasEdit = this.hasDelete =
      nothingConfirmed && hasRemaining && !expired;
    this.hasConfirm = this.data.OrderQuantity >= 0 && !expired;
    this.hasCancelRemaining = notAllConfirmed && hasRemaining && !expired;
    this.hasDeleteRemaining = notAllConfirmed && hasRemaining && expired;
    this.hasBlockingPlan = Boolean(this.data.BlockingPlanId);
  }

  list() {
    this.router.navigateToRoute("list");
  }

  view(params) {
    this.router.navigateToRoute(
      "view",
      { id: params.id },
      { replace: true, trigger: true }
    );
    this.activate(params);
  }

  cancel() {
    this.list();
  }

  edit() {
    this.router.navigateToRoute("edit", { id: this.data.Id });
  }

  confirm(event) {
    this.router.navigateToRoute("confirm", { id: this.data.Id });
  }

  delete() {
    this.service.delete(this.data).then(result => {
      this.list();
    });
  }

  cancelRemaining() {

    var finalData = {
      BookingOrderId : this.data.Id,
      StatusBooking: "CANCEL"
    }

    this.service.setRemainingOrderQuantity(finalData).then(result => {
      this.list();
    });
  }

  detailBlockingPlan() {
    this.router.navigateToRoute("detail", { id: this.data.BlockingPlanId });
  }

  deleteRemaining() {

    var finalData = {
      BookingOrderId : this.data.Id,
      StatusBooking: "DELETE"
    }

    this.service.setRemainingOrderQuantity(finalData).then(result => {
      this.list();
    });
  }
}
