import { inject, bindable } from "aurelia-framework";
import { Service, ServiceMembership } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from 'numeral';

@inject(Router, Service, ServiceMembership)
export class List {
  @bindable flag = false;

  // info = { page: 1, size: 25 };

  context = ["Detail"];

  columns = [
    { title: "Voucher Name", field: "discountName" },
    {
      title: "Nominal", field: "nominal", formatter: function (value, data, index) {
        return numeral(value).format('0,000.00');
      }
    },
    { title: "Voucher Type", field: "discountType" },
    {
      title: "Point Exchanged", field: "exchangePoint", formatter: function (value, data, index) {
        return numeral(value).format('0,000.00');
      }
    },
    { title: "Total Claimed", field: "totalClaimed" },
    { title: "Total Used", field: "totalUse" },
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

  constructor(router, service, serviceMembership) {
    this.service = service;
    this.router = router;
    this.serviceMembership = serviceMembership;
  }

  async activate() {
    this.membershipResult = await this.serviceMembership.getListMembership({})
      .then(result => {
        return result
      });
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

      if (this.info.tierMembership)
        args.membershipId = this.membershipResult.find(x => x.name.toLowerCase() == this.info.tierMembership.toLowerCase()).id;
    }

    return this.service.search(args)
      .then((result) => {
        let data = result.data.map((val) => {
          val.membership = val.membership.split(',')
            .map((id) => {
              return this.membershipResult.find(x => x.id == id).name
            })
          return val
        })
        return {
          total: result.total,
          data: data,
        };
      });
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
    this.info = {};
    this.tableList.refresh();
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
