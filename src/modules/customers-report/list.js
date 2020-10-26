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

  attached() {
    this.options.height =
      $(window).height() -
      $("nav.navbar").height() -
      $("h1.page-header").height();
  }

  loader = (info) => {
    return {
      total: 2,
      data: [
        {
          name: 'Aldi', 
          phoneNumber: '081298291282', 
          email:'aldi@gmail.com', 
          ordertotal: 'Rp 20.000.000', 
          numberOfOrders: '300'
        },
        {
          name: 'Andi', 
          phoneNumber: '081928291282', 
          email:'andi@yahoo.com', 
          ordertotal: 'Rp 2.000.000', 
          numberOfOrders: '30'
        }
      ]
    }
  }

  orderStatusSources = ['','Pending', 'Done']

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

  columns = [
    {
      field: "isSelected",
      checkbox: true,
      sortable: false,
    },
    {
      field: "name",
      title: "Name",
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
      field: "orderTotal",
      title: "Order Total",
      sortable: false,
    },
    {
      field: "numberOfOrders",
      title: "Number of Orders",
      sortable: false,
    },
  ];

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        // this.router.navigateToRoute("view", { id: data.id });
        break;
    }
  }
}
