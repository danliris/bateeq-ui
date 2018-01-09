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
//    {
//        route: 'category',
//        name: 'category',
//        moduleId: './modules/merchandiser/category/index',
//        nav: true,
//        title: 'Kategori',
//        auth: true,
//        settings: {
//            group: "merchandiser",
//            permission: { "MRD.01": 1 },
//            iconClass: 'fa fa-adjust'
//        }
//    },
 //   {
 //       route: 'material',
 //       name: 'material',
 //       moduleId: './modules/merchandiser/material/index',
 //       nav: true,
 //       title: 'Bahan',
 //       auth: true,
 //       settings: {
 //           group: "merchandiser",
 //           permission: { "MRD.01": 1 },
 //           iconClass: 'fa fa-adjust'
 //       }
 //   },
//    {
//        route: 'UOM',
//        name: 'UOM',
//        moduleId: './modules/merchandiser/UOM/index',
//        nav: true,
//        title: 'Satuan',
//        auth: true,
//        settings: {
//            group: "merchandiser",
//            permission: { "MRD.01": 1 },
//            iconClass: 'fa fa-adjust'
//        }
//    },
//    {
//        route: 'size',
//        name: 'size',
//        moduleId: './modules/merchandiser/size/index',
//        nav: true,
//        title: 'Ukuran',
//        auth: true,
//        settings: {
//            group: "merchandiser",
//            permission: { "MRD.01": 1 },
//            iconClass: 'fa fa-adjust'
//        }
//    }
]
