module.exports = [
  {
    route: "/promotion",
    name: "promotion",
    moduleId: "./modules/promotion/index",
    nav: true,
    title: "Voucher",
    auth: true,
    settings: {
      group: "Promotion",
      //permission: { "*": 1 },
      permission: { "C.01": 1, "MRD.01": 1 },
      iconClass: "fa fa-dashboard",
    },
  }
];
