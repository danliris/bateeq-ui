module.exports = [
    {
        route: 'purchase-request',
        name: 'purchase-request',
        moduleId: './modules/purchasing/purchase-request/index',
        nav: true,
        title: 'Purchase Request',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "PBL.01": 1},
            iconClass: 'fa fa-credit-card'
        }
    }
]