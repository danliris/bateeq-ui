module.exports = [
  {
    route: "weekly-plan",
    name: "weekly-plan",
    moduleId: "./modules/master/weekly-plan/index",
    nav: true,
    title: "Master Minggu",
    auth: true,
    settings: {
      group: "masterplan",
      permission: { "PIC.01": 1 },
      iconClass: ""
    }
  },
  {
    route: "booking-orders",
    name: "booking-orders",
    moduleId: "./modules/master-plan/booking-order/index",
    nav: true,
    title: "Booking Order",
    auth: true,
    settings: {
      group: "masterplan",
      permission: { "MRD.01": 1 },
      iconClass: ""
    }
  },
  {
    route: "blocking-plan-sewing",
    name: "blocking-plan-sewing",
    moduleId: "./modules/master-plan/blocking-plan-sewing/index",
    nav: true,
    title: "Blocking Plan Sewing",
    auth: true,
    settings: {
      group: "masterplan",
      permission: { "PIC.01": 1 },
      iconClass: ""
    }
  }
];
