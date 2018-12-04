module.exports = [
    {
        route: 'adjustment',
        name: 'adjustment',
        moduleId: './modules/adjustment-cr/index',
        nav: true,
        title: 'Penyesuaian Stok',
        auth: true,
        settings: {
            group: "general inventory",
            permission: { "ACC.01": 1, "FNC.01": 1},
            iconClass: 'fa fa-gg-circle'
        }
    },
    {
        route: 'stock-opname',
        name: 'stock-opname',
        moduleId: './modules/stock-opname/index',
        nav: true,
        title: 'Stock Opname',
        auth: true,
        settings: {
            group: "general inventory",
            permission: { "ACC.01": 1, "FNC.01": 1},
            iconClass: 'fa fa-gg-circle'
        }
    }
    // ,
    // {
    //     route: 'stock-opname-balance',
    //     name: 'stock-opname-balance',
    //     moduleId: './modules/stock-opname/stock-opname-balance/index',
    //     nav: true,
    //     title: 'Stock Opname Balance',
    //     auth: true,
    //     settings: {
    //         group: "general inventory",
    //         permission: { "ACC.01": 1, "FNC.01": 1},
    //         iconClass: 'fa fa-gg-circle'
    //     }
    // }
]