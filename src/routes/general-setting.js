module.exports = {
  route: "/general-setting",
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
};
