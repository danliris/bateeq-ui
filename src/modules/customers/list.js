import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
var moment = require("moment");

@inject(Router, Service)
export class List {
  info = { page: 1, size: 25 };
  form = {
    email: "",
    phoneNumber: "",
    dobFrom: "",
    dobTo: "",
    membershipTier: "",
    name: "",
  };
  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 8,
    },
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }
  attached() {}

  activate() {
    this.searching();
  }

  search() {
    this.info.page = 1;
    this.info.total = 0;

    if (
      this.form.email == "" &&
      this.form.name == "" &&
      this.form.phoneNumber == "" &&
      this.form.dobFrom == "" &&
      this.form.dobTo == "" &&
      this.form.membershipTier == ""
    ) {
      this.searching();
    } else {
      this.searching("SEARCH");
    }
  }

  async searching(type) {
    let args = {
      page: this.info.page,
      pageSize: this.info.size,
      email: this.form.email ? this.form.email : "",
      name: this.form.name ? this.form.name : "",
      phoneNumber: this.form.phoneNumber ? this.form.phoneNumber : "",
      dobFrom: this.form.dobFrom
        ? moment(this.form.dobFrom).format("YYYY-MM-DD")
        : "",
      dobTo: this.form.dobTo
        ? moment(this.form.dobTo).format("YYYY-MM-DD")
        : "",
      membershipTier: this.form.membershipTier ? this.form.membershipTier : "",
    };

    this.service.search(args).then((result) => {
      this.data = this.formatData(result.data.result);
      if (type == "SEARCH") {
        this.info.total = this.data.length;
      } else {
        this.info.total = result.total;
      }
    });
  }

  formatData(response) {
    let result = response.map((customer) => {
      let fullName = `${customer.firstName} ${customer.lastName}`;
      customer.fullName = fullName;
      customer.isSelected = false;
      return customer;
    });

    return result;
  }

  exportToXls() {
    let args = {
      page: this.info.page,
      size: this.info.size,
      dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
      dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
    };

    this.service.generateExcel(args.dateFrom, args.dateTo);
  }

  changePage(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching();
  }

  view(id) {
    this.router.navigateToRoute("view", { id: id });
  }
}
