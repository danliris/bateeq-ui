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
            permission: { "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "GDG1": 1, "GDG2": 1 },
            iconClass: 'fa fa-table'
        }
    }]