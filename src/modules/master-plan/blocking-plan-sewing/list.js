import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import moment from "moment";
import { Service } from "./service";

@inject(Router, Service)
export class List {
  context = ["detail"];
  data = [];
  info = { page: 1, keyword: "" };
  keyword = "";

  constructor(router, service) {
    this.CustomeTitle = "List Of Blocking Plan Sewing"
    this.router = router;
    this.service = service;
  }

  async activate() {
    this.info.keyword = "";
    var result = await this.service.search(this.info);
    this.data = result.data;
    this.info = result.info;
  }

  create() {
    this.router.navigateToRoute("create");
  }

  rowFormatter(data, index) {
        if (data.Status.toUpperCase() === "CONFIRM FULL")
        {
          return {classes: "success"};    
        }
        else if (data.Status.toUpperCase() === "CONFIRM SEBAGIAN")
        {
          return { classes: "warning" };
        }
        else if (data.Status.toUpperCase() === "BOOKING ADA PERUBAHAN")
        {
          return { classes: "info" };
        }
        else if (data.Status.toUpperCase() === "BOOKING") 
        {
          return {};
        }
        else return { classes: "danger" };
    }
   

  columns = [
    { field: "BookingOrder.Code", title: "Nomor Booking" },
    {
      field: "BookingOrder.BookingDate",
      title: "Tanggal Booking",
      formatter: function(value) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "BookingOrder.Buyer.Name", title: "Buyer" },
    { field: "BookingOrder.OrderQuantity", title: "Jumlah Order" },
    { 
      field: "BookingOrder.DeliveryDate", 
      title: "Tanggal Pengiriman",
      formatter: function(value) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "BookingOrder.Remark", title: "Keterangan" },
    { field: "Status", title: "Status" }
  ];

  loader = info => {
    var order = {};
    if (info.sort) {
      order[info.sort] = info.order;
    }

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    return this.service.search(arg).then(result => {
      var data = {};
      data.total = result.info.total;
      data.data = result.data;
      return {
        total: result.info.total,
        data: result.data
        
      };
    });
  };

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", { id: data.Id });
    }
  }

  view(data) {
    this.router.navigateToRoute("view", { id: data.Id });
  }
}
