import { inject, bindable} from 'aurelia-framework'
import { Router } from "aurelia-router";
import { Service } from "./service";
import moment from "moment";
import "./view.css";

@inject(Router, Service)
export class View {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable customerInfo = {};
  @bindable error = {};

  constructor(router, service) {
    this.router = router;
    console.log(this.router);
    this.service = service;
    console.log(this.service);
  }

  async activate(params) {
    var id = params.id;
    this.customerInfo = await this.service.getCustomersById(id);
    this.customerInfo[0].dbo = moment(this.customerInfo[0].dbo).format("DD MMM YYYY");
    this.customerAddress = await this.service.getAddressBookById(id);
    this.setFullName(this.customerAddress);
    this.customerOrders = [];
  }

  controlOptions = {
    label: {
      length: 2,
    },
    control: {
      length: 10,
    },
  };

  context = ["edit"];

  options = {
    search: false,
    showToggle: false,
    showColumns: false,
  };

  addressColumns = [
    {
      field: "fullName",
      title: "Full Name",
      sortable: false,
      width: "10%",
    },
    {
      field: "email",
      title: "Email",
      sortable: false,
      width: "10%",
    },
    {
      field: "phoneNumber",
      title: "Phone Number",
      sortable: false,
      width: "10%",
    },
    {
      field: "company",
      title: "Company",
      sortable: false,
      width: "10%",
    },
    {
      field: "detail",
      title: "Address",
      sortable: false,
      width: "20%",
    },
    {
      field: "city",
      title: "City",
      sortable: false,
      width: "10%",
    },
    {
      field: "province",
      title: "State / province",
      sortable: false,
      width: "10%",
    },
    {
      field: "postalCode",
      title: "Zip / postal code",
      sortable: false,
      width: "10%",
    },
    {
      field: "country",
      title: "Country",
      sortable: false,
      width: "100%",
    },
  ];

  orderColumns = [
    {
      field: "orderNumber",
      title: "Order Number",
      sortable: false,
      width: "10%",
    },
    {
      field: "orderTotal",
      title: "Order Total",
      sortable: false,
      width: "10%",
    },
    {
      field: "orderStatus",
      title: "Order Status",
      sortable: false,
      width: "10%",
    },
    {
      field: "paymentStatus",
      title: "Payment Status",
      sortable: false,
      width: "10%",
    },
    {
      field: "shippingStatus",
      title: "Shipping Status",
      sortable: false,
      width: "10%",
    },
    {
      field: "orderOrigin",
      title: "Order Origin",
      sortable: false,
      width: "10%",
    },
  ];

  setFullName(list){
    list.map(data => {
      data.fullName = `${data.firstName} ${data.lastName}`
    })
  }

  onAddAddress(params) {
    console.log(params.firstName);
  }

  create() {
    this.router.navigateToRoute("create", {
      addAddress: (params) => onAddAddress(params),
    });
  }

  delete(event) {
    this.service.delete(this.data).then((result) => {
      this.cancel();
    });
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "edit":
        this.router.navigateToRoute("edit", { id: data.id });
        break;
    }
  }
}
