import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Detail {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getBlockingPlanById(id);
    this.total = 0;
    for (let workSchedule of this.data.WorkSchedules){
      this.total += workSchedule.TotalOrder;
    }
  }

  cancel() {
    this.router.navigateToRoute("view", { id: this.data.BookingOrderId });
  }
}
