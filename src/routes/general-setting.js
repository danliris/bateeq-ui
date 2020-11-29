module.exports = [
  {
    route: "/general-setting/reward-point",
    name: "general-setting",
    moduleId: "./modules/general-setting/index",
    nav: true,
    title: "Reward Point",
    auth: true,
    settings: {
      group: "general setting",
      //permission: { "*": 1 },
      permission: { "C.01": 1, "MRD.01": 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/general-setting/reward-point-period",
    name: "general-setting",
    moduleId: "./modules/general-setting/reward-point-period/index",
    nav: true,
    title: "Reward Point Period",
    auth: true,
    settings: {
      group: "general setting",
      //permission: { "*": 1 },
      permission: { "C.01": 1, "MRD.01": 1 },
      iconClass: "fa fa-dashboard",
    },
  },
];
