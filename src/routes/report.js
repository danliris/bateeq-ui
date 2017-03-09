module.exports = [
    {
        route: 'power-bi',
        name: 'power-bi',
        moduleId: './modules/power-bi/index',
        nav: true,
        title: 'Power BI Reports',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "PJL1": 7 },
            iconClass: 'fa fa-bar-chart'
        }
    },
    {
        route: 'daily-omzet-store',
        name: 'daily-omzet-store',
        moduleId: './modules/daily-omzet-store/index',
        nav: true,
        title: 'Omset Harian (per Toko)',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "PJL1": 1 },
        }
    },
    {
        route: 'daily-omzet-sales-category',
        name: 'daily-omzet-sales-category',
        moduleId: './modules/daily-omzet-sales-category/index',
        nav: true,
        title: 'Omset Harian (per Penjualan)',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "PJL1": 1 },
        }
    }]