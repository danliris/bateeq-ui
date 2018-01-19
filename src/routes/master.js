module.exports = [
    {
        route: 'category',
        name: 'category',
        moduleId: './modules/master/category/index',
        nav: true,
        title: 'Kategori',
        auth: true,
        settings: {
            group: "master",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'material',
        name: 'material',
        moduleId: './modules/master/material/index',
        nav: true,
        title: 'Bahan',
        auth: true,
        settings: {
            group: "master",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'UOM',
        name: 'UOM',
        moduleId: './modules/master/UOM/index',
        nav: true,
        title: 'Satuan',
        auth: true,
        settings: {
            group: "master",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'size',
        name: 'size',
        moduleId: './modules/master/size/index',
        nav: true,
        title: 'Size',
        auth: true,
        settings: {
            group: "master",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'OTL',
        name: 'OTL',
        moduleId: './modules/master/OTL/index',
        nav: true,
        title: 'Ongkos',
        auth: true,
        settings: {
            group: "master",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'buyer',
        name: 'buyer',
        moduleId: './modules/master/buyer/index',
        nav: true,
        title: 'Pembeli',
        auth: true,
        settings: {
            group: "master",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'efficiency',
        name: 'efficiency',
        moduleId: './modules/master/efficiency/index',
        nav: true,
        title: 'Efisiensi',
        auth: true,
        settings: {
            group: "master",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'size-range',
        name: 'size-range',
        moduleId: './modules/master/size-range/index',
        nav: true,
        title: 'Size Range',
        auth: true,
        settings: {
            group: "master",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    }
]