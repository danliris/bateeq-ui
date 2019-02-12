module.exports = [
    // {
    //     route: 'upload-file-pbj',
    //     name: 'upload-file-pbj',
    //     moduleId: './modules/upload-file-pbj/index',
    //     nav: true,
    //     title: 'Upload Packing List Barang Jadi ke Toko',
    //     auth: true,
    //     settings: {
    //         group: "gudang pusat",
    //         permission: { "GDG1": 1 },
    //         iconClass: 'fa fa-bank'
    //     }
    // },
    // {
    //     route: 'upload-file-pba',
    //     name: 'upload-file-pba',
    //     moduleId: './modules/upload-file-pba/index',
    //     nav: true,
    //     title: 'Upload Packing List Embalase ke Toko',
    //     auth: true,
    //     settings: {
    //         group: "gudang pusat",
    //         permission: { "GDG1": 1 },
    //         iconClass: 'fa fa-bank'
    //     }
    // },
    {
        route: 'efr-tb-bbp',
        name: 'efr-tb-bbp',
        moduleId: './modules/efr-tb-bbp-cr/index',
        nav: true,
        title: 'Pemasukan Barang',
        auth: true,
        settings: {
            group: "gudang pusat",
            permission: { "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1 },
            iconClass: 'fa fa-bank'
        }
    }, {
        route: 'packingList',
        name: 'packingList',
        moduleId: './modules/packing-list-cr/index',
        nav: true,
        title: 'PackingList',
        auth: true,
        settings: {
            group: "gudang pusat",
            permission: { "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1 },
            iconClass: 'fa fa-bank'
        }
    },
    {
        route: 'packingList-tt',
        name: 'packingList-tt',
        moduleId: './modules/packing-list-tt/index',
        nav: true,
        title: 'PackingList Transfer Stock',
        auth: true,
        settings: {
            group: "gudang pusat",
            permission: { "GDG.01": 1 },
            iconClass: 'fa fa-bank'
        }
    },
    {
        route: 'efr-kb-exp',
        name: 'efr-kb-exp',
        moduleId: './modules/efr-kb-exp-cr/index',
        nav: true,
        title: 'Distribusi Barang ke Ekspedisi',
        auth: true,
        settings: {
            group: "gudang pusat",
            permission: { "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1 },
            iconClass: 'fa fa-bank'
        }
    },
    {
        route: 'efr-kb-rtu',
        name: 'efr-kb-rtu',
        moduleId: './modules/efr-kb-rtu-cr/index',
        nav: true,
        title: 'Retur Barang Ke Unit',
        auth: true,
        settings: {
            group: "gudang pusat",
            permission: { "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1,"GDG.10" : 1 },
            iconClass: 'fa fa-bank'
        }
    }
]