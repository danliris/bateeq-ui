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
    if (data.StatusRemainingOrder.toUpperCase() !== "EXPIRED" ){
        if (data.Status.toUpperCase() ===  "SUDAH DIBUAT MASTER PLAN"){
          return {classes: "success"};
        }
        else if (data.Status.toUpperCase() === "BOOKING"){
          return {};
        }
        else if (data.Status.toUpperCase() === "CONFIRMED"){
          return {classess:"info"};
        }
        else if(data.StatusRemainingOrder.toUpperCase() === "ON PROCESS") {
          return {classes:"info"};
        }
        else return {
        };   
    }
  else {
    return {classes:"danger"};
  }
  }
  /*rowFormatter(data, index) { 
     if (data.StatusRemainingOrder.toUpperCase() !== "EXPIRED" ){
        if (data.Status.toUpperCase() ===  "SUDAH DIBUAT MASTER PLAN"){
          return {classes: "success"};
        }
        else if(data.StatusRemainingOrder.toUpperCase() === "ON PROCESS") {
          return {classes:"info"};
        }
        else return {

        };   
    }
    else {
      return {classes:"danger"};
    }
  }*/
 
  columns = [    
    { field: "Code", title: "Kode Booking" },
    { 
      field: "BookingDate",      
      title: "Tanggal Booking",
      formatter: function(value) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "Buyer.Name", title: "Buyer" },
    { field: "OrderQuantity", title: "Jumlah Order" },
    { 
      field: "DeliveryDate",
      title: "Tanggal Pengiriman",
      formatter: function(value) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "Remark", title: "Keterangan" },
    { field: "Status", title: "Status Booking Order" },
    { field: "StatusTotalConfirm", title: "Status Jumlah Confirm" },
    { field: "StatusRemainingOrder", title: "Status Sisa Order" }
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
