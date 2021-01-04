module.exports = [
	{
  		route: "/customers-report",
		name: "customers-report",
		moduleId: "./modules/customers-report/index",
		nav: true,
		title: "Customer Report by Orders",
		auth: true,
		settings: {
			group: "Report",
			//permission: { "*": 1 },
			permission: { "C.01": 1, "MRD.01": 1 },
			iconClass: "fa fa-dashboard",
		},
	}
];
