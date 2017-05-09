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
    }]