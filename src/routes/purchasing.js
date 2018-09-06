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
            permission: { "*": 1 },
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
            permission: { "PBL.01": 1 },
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
            permission: { "PBL.01": 1 },
            iconClass: 'fa fa-credit-card'
        }
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
            permission: { "PBL.01": 7 },
            iconClass: 'fa fa-credit-card'
        }
    },
    {
        route: 'delivery-order',
        name: 'delivery-order',
        moduleId: './modules/purchasing/delivery-order/index',
        nav: true,
        title: 'Delivery Order',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "PBL.01": 1 },
            iconClass: 'fa fa-credit-card'
        }
    },
    {
        route: 'unit-receipt',
        name: 'unit-receipt',
        moduleId: './modules/purchasing/unit-receipt-note/index',
        nav: true,
        title: 'Unit Receipt',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "PBL.01": 1 },
            iconClass: 'fa fa-credit-card'
        }
    },
    {
        route: 'unit-payment-order',
        name: 'unit-payment-order',
        moduleId: './modules/purchasing/unit-payment-order/index',
        nav: true,
        title: 'Unit Payment Order',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "PBL.01": 1 },
            iconClass: 'fa fa-credit-card'
        }
    },
    {
        route: 'price-correction',
        name: 'unit-payment-price-correction-note',
        moduleId: './modules/purchasing/price-correction/index',
        nav: true,
        title: 'Price Correction',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "PBL.01": 1 },
            iconClass: 'fa fa-credit-card'
        }
    },
    {
        route: 'quantity-correction',
        name: 'unit-payment-quantity-correction-note',
        moduleId: './modules/purchasing/quantity-correction/index',
        nav: true,
        title: 'Quantity Correction',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "PBL.01": 1 },
            iconClass: 'fa fa-credit-card'
        }
    }
]