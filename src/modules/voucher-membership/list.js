import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import { resolve } from "bluebird";

@inject(Router, Service)
export class List {
  @bindable flag = false;

  // info = { page: 1, size: 25 };

  context = ["Detail"];

  columns = [
    { title: "Nominal", field: "nominal" },
    { title: "Voucher Type", field: "discountType" },
    { title: "Point Exchanged", field: "exchangePoint" },
    { title: "Total Claimed", field: "totalClaimed" },
    { title: "Total Used", field: "nominal" },
    { title: "Member", field: "membership" }
  ];

  voucherType = ["", "Nominal", "Product"];

  tierMembershipType = ["", "Silver", "Gold", "Platinum"];

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

  activate() {
    // this.searching();
  }

  search() {
    this.flag = true;
    this.tableList.refresh();
  }

  loader = (info) => {
    // if (info.sort) order[info.sort] = info.order;

    let args = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      limit: info.limit
    };

    if (this.flag) {
      if (this.info.startDate)
        args.startDate = moment(this.info.startDate).format("YYYY/MM/DD");

      if (this.info.endDate)
        args.endDate = moment(this.info.endDate).format("YYYY/MM/DD");

      if (this.info.voucherType) {
        switch (this.info.voucherType.toLowerCase()) {
          case "product":
            args.voucherType = "2";
            break;
          case "nominal":
            args.voucherType = "9";
            break;
          default:
            args.voucherType = "8";
            break;
        }
      }

      if (this.info.tierMembership) {
        switch (this.info.voucherType.toLowerCase()) {
          case "silver":
            args.membershipId = 2;
            break;
          case "gold":
            args.membershipId = 1;
            break;
          case "platinum":
            args.membershipId = 4;
            break;
          default:
            args.membershipId = '';
            break;
        }
      }
    }

    // return { total: this.data.length, data: this.data };
    return this.flag ? this.service.search(args).then((result) => {
      return {
        total: result.info.Count,
        data: result.data,
      };
    })
      : { total: 0, data: [] };
  };

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute('view', { id: data.id });
        break;
    }
  }

  reset() {
    this.flag = false;
    this.error = {};
    this.info.startDate = undefined;
    this.info.endDate = undefined;
    this.info.voucherType = "";
    this.info.tierMembership = "";
    this.tableList.refresh();
  }

  create() {
    this.router.navigateToRoute("create");
  }

  // view(id) {
  //   this.router.navigateToRoute("view", { id: id });
  // }
}
