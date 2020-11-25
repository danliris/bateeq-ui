import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import numeral from "numeral";
import React from "react";

@inject(Router, Service)
export class List {
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

  context = ["detail"];

  options = {
    search: false,
    showToggle: false,
  };

  columns = [
    {
      field: "tierName",
      title: "Tier Name",
      align: "center",
    },
    {
      field: "minimumShoppingAccumulation",
      title: "Minimum Shopping Accumulation",
      align: "center",
      formatter: function (value, data, index) {
        return numeral(value).format("0,0");
      },
    },
    {
      field: "discountPrivilege",
      title: "Discount Privilege",
      align: "center",
      formatter: function (value, data, index) {
        let res = value === 0 ? "-" : `${value}%`;
        return res;
      },
    },
    {
      field: "termAndConditions",
      title: "Term and Conditions",
      formatter: function (value, data, index) {
        let arr = value.split("\n");
        return arr.map((t) => `<label>${t}</label>`);
      },
    },
  ];

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", { id: data.id });
        break;
    }
  }

  dummyData = [
    {
      id: 1,
      tierName: "Silver",
      minimumShoppingAccumulation: 1000000,
      discountPrivilege: 0,
      termAndConditions:
        "1.Status Silver member akan langsung diperoleh\n2.Status Silver member akan langsung diperoleh\n3.Status Silver member akan langsung diperoleh",
    },
    {
      id: 2,
      tierName: "Gold",
      minimumShoppingAccumulation: 2000000,
      discountPrivilege: 99,
      termAndConditions:
        "1.Status Silver member akan langsung diperoleh\n2.Status Silver member akan langsung diperoleh\n3.Status Silver member akan langsung diperoleh",
    },
  ];

  loader = (info) => {
    // var order = {};
    // if (info.sort) order[info.sort] = info.order;
    // var arg = {
    //   page: parseInt(info.offset / info.limit, 10) + 1,
    //   size: info.limit,
    //   keyword: info.search,
    //   order: order,
    // };

    // return this.service.search(arg).then((result) => {
    //   console.log(result);
    //   var data = {};
    //   console.log(data);
    //   data.total = result.info.total;
    //   data.data = result.data;
    //   return {
    //     total: result.info.total,
    //     data: result.data,
    //   };
    // });
    return {
      total: 3,
      data: this.dummyData,
    };
  };

  create() {
    this.router.navigateToRoute("create");
  }
}
