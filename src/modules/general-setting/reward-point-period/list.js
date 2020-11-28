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
  }

  async activate(params) {
    this.data = await this.service.getRewardPointExipred();
    this.masaBerlakuPoin = this.data.value;
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
      id: 1,
      value: this.masaBerlakuPoin
    })
    .then(res => {
      alert('Updated')
    })
  }
}
