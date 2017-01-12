module.exports = [
    {
        route: 'inventories',
        name: 'inventories',
        moduleId: './modules/storage-inventory/index',
        nav: true,
        title: 'Laporan Stok',
        auth: true,
        settings: {
            group: "laporan",
            roles: ["*"],
            iconClass: 'fa fa-table'
        }
    }]