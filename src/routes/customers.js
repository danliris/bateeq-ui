module.exports = {
    route: '/customers',
    name: 'customers',
    moduleId: './modules/customers/index',
    nav: true,
    title: 'Customers',
    auth: false,
    settings: {
        group: "customers",
        //permission: { "*": 1 },
        permission: { "C.01": 1, "MRD.01": 1 },
        iconClass: 'fa fa-dashboard'
    }
};