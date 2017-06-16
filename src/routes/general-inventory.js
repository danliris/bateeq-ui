module.exports = [
    {
        route: 'adjustment',
        name: 'adjustment',
        moduleId: './modules/adjustment-cr/index',
        nav: true,
        title: 'Penyesuaian Stok',
        auth: true,
        settings: {
            group: "general inventory",
            permission: { "FA.01": 1, "FA.02": 1, "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1, "GDG.10": 1 },
            iconClass: 'fa fa-gg-circle'
        }
    },
    
    {
        route: 'stock-opname',
        name: 'stock-opname',
        moduleId: './modules/stock-opname/index',
        nav: true,
        title: 'Stock Opname',
        auth: true,
        settings: {
            group: "general inventory",
            permission: { "FA.01": 1, "FA.02": 1, "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1, "GDG.10": 1 },
            iconClass: 'fa fa-gg-circle'
        }
    }
]