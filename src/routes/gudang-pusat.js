module.exports = [
    {
        route: 'upload-file-pbj',
        name: 'upload-file-pbj',
        moduleId: './modules/upload-file-pbj/index',
        nav: true,
        title: 'Upload Packing List Barang Jadi ke Toko',
        auth: true,
        settings: {
            group: "gudang pusat",
            permission: { "GDG1": 1 },
            iconClass: 'fa fa-bank'
        }
    },
    {
        route: 'upload-file-pba',
        name: 'upload-file-pba',
        moduleId: './modules/upload-file-pba/index',
        nav: true,
        title: 'Upload Packing List Embalase ke Toko',
        auth: true,
        settings: {
            group: "gudang pusat",
            permission: { "GDG1": 1 },
            iconClass: 'fa fa-bank'
        }
    }
    ,
    {
        route: 'efr-tb-bbp',
        name: 'efr-tb-bbp',
        moduleId: './modules/efr-tb-bbp-cr/index',
        nav: true,
        title: 'Pemasukan Barang Jadi',
        auth: true,
        settings: {
            group: "gudang pusat",
            permission: { "GDG1": 1 },
            iconClass: 'fa fa-bank'
        }
    },
    {
        route: 'packingList',
        name: 'packingList',
        moduleId: './modules/packing-list-cr/index',
        nav: true,
        title: 'PackingList',
        auth: true,
        settings: {
            group: "gudang pusat",
            permission: { "GDG1": 1 },
            iconClass: 'fa fa-bank'
        }
    }
    ]