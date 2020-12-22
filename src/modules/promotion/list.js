import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  @bindable flag = false;

  context = ["Detail"];

  columns = [
    {
      field: "isSelected",
      title: "isSelected Checkbox",
      checkbox: true,
      sortable: false,
      formatter: function(value, data, index) {
          this.checkboxEnabled = (data.status.toLowerCase() == 'active');
          return ""
      }
    },
    { title: "Discount Name", field: "discountName" },
    { title: "Discount Type", field: "discountType" },
    {
      title: "Start Date", field: "startDate", formatter: function (value, data, index) {
        return moment(value).format('DD/MM/YYYY')
      }
    },
    {
      title: "End Date", field: "endDate", formatter: function (value, data, index) {
        return moment(value).format('DD/MM/YYYY')
      }
    },
    { title: "Total Used", field: "totalUse" },
    { title: "Status", field: "status" }
  ];

  voucherTypeSources = [
    "",
    "Percentage",
    "Nominal",
    "Buy n free m",
    "Buy n discount m%",
    "Buy n discount m% product (n)th",
    "Pay nominal Rp.xx, Free 1 product",
  ];

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

  loader = (info) => {
    let args = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      pageSize: info.limit,
      discountName: info.search ? info.search : ''
    }

    if (this.flag) {
      if (this.info.voucherType) {
        switch (this.info.voucherType.toLowerCase()) {
          case "percentage":
            args.voucherType = "1";
            break;
          case "nominal":
            args.voucherType = "0";
            break;
          case "buy n free m":
            args.voucherType = "3";
            break;
          case "buy n discount m%":
            args.voucherType = "5";
            break;
          case "buy n discount m% product (n)th":
            args.voucherType = "6";
            break;
          case "pay nominal rp.xx, free 1 product":
            args.voucherType = "7";
            break;
          default:
            args.voucherType = "0";
            break;
        }
      }

      args.startDate = this.info.startDate ? moment(this.info.startDate).format("DD-MM-YYYY") : "01/01/0001"
      args.endDate = this.info.endDate ? moment(this.info.endDate).format("DD-MM-YYYY") : "01/01/0001"
      args.discountCode = this.info.discountCode ? this.info.discountCode : ""
      args.discountName = this.info.discountName ? this.info.discountName : ""
    }

    return this.service.search(args).then((result) => {
      return {
        total: result.length,
        data: result,
      };
    });
  }

  search() {
    this.flag = true;
    this.tableList.refresh();
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

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute('view', { id: data.id });
        break;
    }
  }
}
