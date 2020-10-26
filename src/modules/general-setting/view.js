import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import moment from "moment";
import "./view.css";

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    console.log(this.router);
    this.service = service;
    console.log(this.service);
  }

  data = null;

  async activate(params) {
    this.data = {
      firstName: "Customer",
      lastName: "Bateeq",
      email: "customer@gmail.com",
      phoneNumber: "+6281297838373",
      gender: "Woman",
      doB: moment("03-10-2003").format("DD MMM YYYY"),
      membershipTier: "Premium",
      orders: [
        {
          orderNumber: "ASD-123",
          orderTotal: 2,
          orderStatus: "done",
          paymentStatus: "done",
          shippingStatus: "delivered",
          orderOrigin: "BateeqShop",
        },
        {
          orderNumber: "ASD-122",
          orderTotal: 1,
          orderStatus: "done",
          paymentStatus: "done",
          shippingStatus: "delivered",
          orderOrigin: "POS",
        },
        {
          orderNumber: "ASD-121",
          orderTotal: 5,
          orderStatus: "done",
          paymentStatus: "done",
          shippingStatus: "delivered",
          orderOrigin: "BateeqShop",
        },
      ],
      totalPoin: 20,
      shipmentAddress: [
        {
          id: 1,
          firstName: "Customer",
          lastName: "Bateeq",
          fullName: "Customer Bateeq",
          email: "customer@gmail.com",
          phoneNumber: "+6281297838373",
          company: "Moonlay Technologies",
          fax: "-",
          address1:
            "SCBD, Moonlay Technologies - Equity Tower, 25th floor, Suite H. Jl. Jend. Sudirman kav 52-53, RT.5/RW.3",
          address2:
            "SCBD, Moonlay Technologies - Equity Tower, 25th floor, Suite H. Jl. Jend. Sudirman kav 52-53, RT.5/RW.3",
          city: "South Jakarta City",
          province: "DKI Jakarta",
          zip: "12190",
          country: "Indonesia",
        },
      ],
    };
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
      field: "address1",
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
      field: "zip",
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
