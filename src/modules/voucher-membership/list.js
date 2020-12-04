import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import { resolve } from "bluebird";

@inject(Router, Service)
export class List {
  // @bindable flag = false;

  // info = { page: 1, size: 25 };

  context = ["Detail"];

  columns = [
    { title: "Nominal", field: "nominal" },
    { title: "Voucher Type", field: "voucher" },
    { title: "Point Exchanged", field: "pointExchanged" },
    { title: "Total Claimed", field: "totalClaimed" },
    { title: "Total Used", field: "totalUsed" },
    { title: "Member", field: "member" }
  ];

  voucherType = [
    { label: "Choose voucher..", value: "" },
    { label: "Nominal", value: "nominal" },
    { label: "Voucher", value: "voucher" }
  ];

  tierMembershipType = [
    { label: "Choose membership..", value: "" },
    { label: "Silver", value: "silver" },
    { label: "Gold", value: "gold" },
    { label: "Platinum", value: "platinum" }
  ];

  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 8,
    },
  };

  data = [
    {
      id: "1",
      nominal: "nominal",
      voucher: "voucher",
      pointExchanged: "pointExchanged",
      totalClaimed: "totalClaimed",
      totalUsed: "totalUsed",
      member: "member"
    },
    {
      id: "2",
      nominal: "nominal",
      voucher: "voucher",
      pointExchanged: "pointExchanged",
      totalClaimed: "totalClaimed",
      totalUsed: "totalUsed",
      member: "member"
    }
  ];

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
    if (info.sort) order[info.sort] = info.order;

    let arg = {
    };

    return { total: this.data.length, data: this.data };
    // return this.flag ? this.service.search(arg).then((result) => {
    //     return {
    //       total: result.info.Count,
    //       data: result.data,
    //     };
    //   })
    // : { total: 0, data: [] };
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
    this.info.voucherType = { label: "Choose voucher..", value: "" };
    this.info.tierMembership = { label: "Choose membership..", value: "" };
    this.tableList.refresh();
  }

  create() {
    this.router.navigateToRoute("create");
  }

  // view(id) {
  //   this.router.navigateToRoute("view", { id: id });
  // }
}
