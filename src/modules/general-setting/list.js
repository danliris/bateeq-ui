import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import "./list.css";

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  id = 0;
  shoppingTotal = 0;
  pointsEarned = 0;

  attached() {
    this.options.height =
      $(window).height() -
      $("nav.navbar").height() -
      $("h1.page-header").height();
  }
  
  async activate(params) {
    this.rewardPoint = await this.service.getRewardPoint();
    this.id = this.rewardPoint[0].id;
    this.shoppingTotal = this.rewardPoint[0].shoppingTotal;
    this.pointsEarned = this.rewardPoint[0].pointsEarned;
  }

  controlOptions = {
    label: {
      length: 5,
    },
    control: {
      length: 7,
    },
  };

  onSave() {
    this.service.update({
      id: this.id,
      shoppingTotal: this.shoppingTotal,
      pointsEarned: this.pointsEarned,
      active: true
    })
    .then(res => {
      alert('Updated')
    })
  }
}
