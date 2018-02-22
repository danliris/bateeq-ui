module.exports = [
    {
        route: 'product',
        name: 'product',
        moduleId: './modules/merchandiser/product/index',
        nav: true,
        title: 'Produk',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'bank',
        name: 'bank',
        moduleId: './modules/bank/index',
        nav: true,
        title: 'Bank',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-university'
        }
    },
    {
        route: 'range-disc-product',
        name: 'range-disc-product',
        moduleId: './modules/range-disc-product/index',
        nav: true,
        title: 'Range Diskon Produk',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-university'
        }
    },
    {
        route: 'cost-calculation-retail',
        name: 'cost-calculation-retail',
        moduleId: './modules/merchandiser/cost-calculation-retail/index',
        nav: true,
        title: 'Cost Calculation Retail',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-university'
        }
    },
    {
        route: 'cost-calculation-garment',
        name: 'cost-calculation-garment',
        moduleId: './modules/merchandiser/cost-calculation-garment/index',
        nav: true,
        title: 'Cost Calculation Garment',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-university'
        }
    }
]