import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  info = { page: 1, size: 25 };
  form = {
    startDate: "",
    endDate: "",
    voucherType: "",
    discountCode: "",
    discountName: "",
  };
  voucherTypeSources = [
    "",
    "Percentage",
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

  rowFormatter(data, index) {
    if (data.status == "NonActive") {
      return { css: { "background-color": "lightgray" } };
    } else return {};
  }

  attached() {
    this.options.height =
      $(window).height() -
      $("nav.navbar").height() -
      $("h1.page-header").height();
  }
  activate() {
    this.searching();
    // this.data = [
    //   {
    //     id: 1,
    //     discountName: "Batik Day",
    //     discountType: "Percetage",
    //     startDate: "03-10-2020",
    //     endDate: "03-11-2020",
    //     totalUse: 30,
    //     status: "Active",
    //   },
    //   {
    //     id: 2,
    //     discountName: "Independence Day",
    //     discountType: "Norminal",
    //     startDate: "03-10-2019",
    //     endDate: "03-11-2019",
    //     totalUse: 30,
    //     status: "NonActive",
    //   },
    //   {
    //     id: 3,
    //     discountName: "Batik Day",
    //     discountType: "Percetage",
    //     startDate: "03-10-2020",
    //     endDate: "03-11-2020",
    //     totalUse: 30,
    //     status: "Active",
    //   },
    //   {
    //     id: 4,
    //     discountName: "Batik Day",
    //     discountType: "Percetage",
    //     startDate: "03-10-2020",
    //     endDate: "03-11-2020",
    //     totalUse: 30,
    //     status: "Active",
    //   },
    // ];
  }

  search() {
    this.info.page = 1;
    this.info.total = 0;
    if (
      this.form.startDate == "" &&
      this.form.endDate == "" &&
      this.form.voucherType == "" &&
      this.form.discountCode == "" &&
      this.form.discountName == ""
    ) {
      this.searching();
    } else {
      this.searching("SEARCH");
    }
  }

  async searching(type) {
    var voucherTypeStr ="";
    switch(this.form.voucherType.toLowerCase())
    {
        case "percentage":
        voucherTypeStr= "1";
        break;
        case "nominal":
        voucherTypeStr= "0";
        break;
        case "buy n free m":
        voucherTypeStr= "3";
        break;
        case "buy n discount m%":
        voucherTypeStr= "5";
        break;
        case "buy n discount m% product (n)th":
        voucherTypeStr= "6";
        break;
        case "pay nominal rp.xx, free 1 product":
        voucherTypeStr= "7";
        break;
        default:
        voucherTypeStr= "0";
        
        break;
    }

    let args = {
      // page: this.info.page,
      // pageSize: this.info.size,
      startDate: this.form.startDate
        ? moment(this.form.startDate).format("YYYY-MM-DD")
        : "01/01/0001",
      endDate: this.form.endDate
        ? moment(this.form.endDate).format("YYYY-MM-DD")
        : "01/01/0001",
      // voucherType: this.form.voucherType ? this.form.voucherType : "0",
      voucherType: voucherTypeStr,
      discountCode: this.form.discountCode ? this.form.discountCode : "",
      discountName: this.form.discountName ? this.form.discountName : "",
    };

    this.service.search(args).then((result) => {
      this.data = result;
      // if (type == "SEARCH") {
      //   this.info.total = this.data.length;
      // } else {
      //   this.info.total = result.total;
      // }
    });
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

  create() {
    this.router.navigateToRoute("create");
  }

  view(id) {
    this.router.navigateToRoute("view", { id: id });
  }
}
