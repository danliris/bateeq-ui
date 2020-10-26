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

  rowFormatter(data, index) {
    if (data.status == 'NonActive'){
        return { css: { "background-color": "lightgray" } }
    }
    else
      return {}
  }
  
  discountName="";
  discountCode="";
  voucherTypeSources = [
    "",
    "Percentage", 
    "Buy n free m", 
    "Buy n discount m%", 
    "Buy n discount m% product (n)th",
    "Pay nominal Rp.xx, Free 1 product"
  ];

  context = ["detail"];
  
  loader = (info) => {
    return {
      total: 4,
      data: [
        {
          id: 1,
          discountName: 'Batik Day',
          discountType: 'Percetage',
          startDate: '03-10-2020',
          endDate: '03-11-2020',
          totalUse: 30,
          status: 'Active'
        },
        {
          id: 2,
          discountName: 'Independence Day',
          discountType: 'Norminal',
          startDate: '03-10-2019',
          endDate: '03-11-2019',
          totalUse: 30,
          status: 'NonActive'
        },
        {
          id: 3,
          discountName: 'Batik Day',
          discountType: 'Percetage',
          startDate: '03-10-2020',
          endDate: '03-11-2020',
          totalUse: 30,
          status: 'Active'
        },
        {
          id: 4,
          discountName: 'Batik Day',
          discountType: 'Percetage',
          startDate: '03-10-2020',
          endDate: '03-11-2020',
          totalUse: 30,
          status: 'Active'
        }
      ]
    }
    // return this.service.getCustomers()
    //     .then(result => {
    //       result.map(customer => {
    //         let fullName = `${customer.firstName} ${customer.lastName}`;
    //         customer.fullName = fullName;
    //       })          
    //       return {
    //           total: result.length,
    //           data: result
    //       }
    //     });
  }

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

  columns = [
    {
      field: "discountName",
      title: "Discount Name",
      sortable: false,
    },
    {
      field: "discountType",
      title: "Discount Type",
      sortable: false,
    },
    {
      field: "startDate",
      title: "Start Date",
      sortable: false,
    },
    {
      field: "endDate",
      title: "End Date",
      sortable: false,
    },
    {
      field: "totalUse",
      title: "Total Use",
      sortable: false,
    },
    {
      field: "status",
      title: "Status",
      sortable: true,
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

  create() {
    this.router.navigateToRoute('create');
  } 
}
