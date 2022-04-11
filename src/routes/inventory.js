module.exports = [
    {
        route: 'inventory/inventory-documents',
        name: 'inventory/inventory-documents',
        moduleId: './modules/inventory/inventory-document/index',
        nav: true,
        title: 'Dokumen Inventory',
        auth: true,
        settings: {
            group: "Inventory",
            permission: {"GDG.07": 1, "GDG.08": 1, "GDG.10": 1, "PBL.01": 1 },
           //permission: {"*": 1},
            iconClass: 'fa fa-gg-circle'
        }
    },
    {
        route: 'inventory/reports/inventory-movement-report',
        name: 'inventory/reports/inventory-movement-report',
        moduleId: './modules/inventory/reports/inventory-movement-report/index',
        nav: true,
        title: 'Laporan Stock In/Out',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "GDG.07": 1, "GDG.08": 1, "GDG.10": 1, "PBL.01": 1 },
            //permission: {"*": 1},
            iconClass: 'fa fa-gg-circle'
        }
    },
    {
        route: 'inventory/reports/inventory-summary-report',
        name: 'inventory/reports/inventory-summary-report',
        moduleId: './modules/inventory/reports/inventory-summary-report/index',
        nav: true,
        title: 'Kartu Stok',
        auth: true,
        settings: {
            group: "Inventory",
           permission: { "GDG.07": 1, "GDG.08": 1, "GDG.10": 1, "PBL.01": 1 },
           //permission: {"*": 1},
           iconClass: 'fa fa-gg-circle'
        }
    },
]
