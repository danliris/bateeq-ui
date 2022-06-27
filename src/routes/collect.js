module.exports = {
  route: "omzet",
  name: "omzet",
  moduleId: "./modules/collect/omzet/index",
  nav: true,
  title: "Collect Omzet",
  auth: false,
  settings: {
    group: "collect",
    //permission: { "*": 1 },
    permission: { "C.01": 1, "MRD.01": 1 },
    iconClass: "fa fa-dashboard",
  },
};
