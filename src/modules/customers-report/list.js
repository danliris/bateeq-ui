import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";

@inject(Router, Service)
export class List {
  info = { page: 1, size: 25 };
  form = {
    fromDate: "",
    toDate: "",
    orderStatus: "",
    fromTotalOrder: "",
    toTotalOrder: "",
  };
  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 8,
    },
  };
  controlOptionsDate = {
    label: {
      length: 0,
    },
    control: {
      length: 12,
    },
  };
  orderStatusSources = ["", "Pending", "Done"];

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  attached() {
    this.options.height =
      $(window).height() -
      $("nav.navbar").height() -
      $("h1.page-header").height();
  }

  attached() {}

  activate() {
    // this.searching();
    this.data = [
      {
        name: "Aldi",
        phoneNumber: "081298291282",
        email: "aldi@gmail.com",
        ordertotal: "Rp 20.000.000",
        numberOfOrders: "300",
      },
      {
        name: "Andi",
        phoneNumber: "081928291282",
        email: "andi@yahoo.com",
        ordertotal: "Rp 2.000.000",
        numberOfOrders: "30",
      },
    ];
  }

  search() {
    // this.info.page = 1;
    // this.info.total = 0;
    // if (
    //   this.form.email == "" &&
    //   this.form.name == "" &&
    //   this.form.phoneNumber == "" &&
    //   this.form.dobFrom == "" &&
    //   this.form.dobTo == "" &&
    //   this.form.membershipTier == ""
    // ) {
    //   this.searching();
    // } else {
    //   this.searching("SEARCH");
    // }
  }

  async searching(type) {
    let args = {
      page: this.info.page,
      pageSize: this.info.size,
      orderStatus: this.form.orderStatus ? this.form.orderStatus : "",
      fromTotalOrder: this.form.fromTotalOrder ? this.form.fromTotalOrder : "",
      toTotalOrder: this.form.toTotalOrder ? this.form.toTotalOrder : "",
      fromDate: this.form.fromDate
        ? moment(this.form.fromDate).format("YYYY-MM-DD")
        : "",
      toDate: this.form.toDate
        ? moment(this.form.dotoDatebTo).format("YYYY-MM-DD")
        : "",
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
}
