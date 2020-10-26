import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import "./list.css";

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

  loader = (info) => {
    var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        }

        return this.service.getCustomers(arg)
            .then(result => {
              result.map(customer => {
                let fullName = `${customer.firstName} ${customer.lastName}`;
                customer.fullName = fullName;
              })          
              return {
                  total: result.length,
                  data: result
              }
            });
  }

  context = ["detail"];

  options = {
    search: false,
    showToggle: false,
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

  membershipSources = ["Classic", "Gold", "Premium"];

  columns = [
    {
      field: "isSelected",
      checkbox: true,
      sortable: false,
    },
    {
      field: "email",
      title: "Email",
      sortable: false,
    },
    {
      field: "phoneNumber",
      title: "Phone Number",
      sortable: false,
    },
    {
      field: "fullName",
      title: "Full Name",
      sortable: false,
    },
    {
      field: "userMemberships",
      title: "Membership Tier",
      sortable: false,
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
}
