module.exports = [
  {
    route: "/promotion",
    name: "voucher",
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
  },
  {
    route: "/voucher-membership",
    name: "membership",
    moduleId: "./modules/voucher-membership/index",
    nav: true,
    title: "Voucher Membership",
    auth: true,
    settings: {
      group: "Promotion",
      //permission: { "*": 1 },
      permission: { "C.01": 1, "MRD.01": 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/master-membership",
    name: "membership",
    moduleId: "./modules/master-membership/index",
    nav: true,
    title: "Master Membership",
    auth: true,
    settings: {
      group: "Promotion",
      //permission: { "*": 1 },
      permission: { "C.01": 1, "MRD.01": 1 },
      iconClass: "fa fa-dashboard",
    },
  },
];
