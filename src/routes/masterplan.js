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
      permission: { "*": 1 },
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
      permission: { "*": 1 },
      iconClass: ""
    }
  }
];
