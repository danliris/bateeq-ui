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
            roles: ["*"],
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
            roles: ["*"],
            iconClass: 'fa fa-bank'
        }
    }]