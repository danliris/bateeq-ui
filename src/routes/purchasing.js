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
    },
    {
        route: 'purchase-order',
        name: 'purchase-order',
        moduleId: './modules/purchasing/purchase-order/index',
        nav: true,
        title: 'Purchase Order',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "PBL.01": 1},
            iconClass: 'fa fa-credit-card'
        }
    },
    {
        route: 'purchase-order-external',
        name: 'purchase-order-external',
        moduleId: './modules/purchasing/purchase-order-external/index',
        nav: true,
        title: 'Purchase Order External',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "PBL.01": 1},
            iconClass: 'fa fa-credit-card'
        },
    },
    {
        route: 'purchase-order-external-all',
        name: 'purchase-order-external-all',
        moduleId: './modules/purchasing/purchase-order-external-kasei/index',
        nav: true,
        title: 'Purchase Order External All',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "PBL.01": 7},
            iconClass: 'fa fa-credit-card'
        },
    }
]