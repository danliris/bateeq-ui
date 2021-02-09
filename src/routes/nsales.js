module.exports = [
    {
        route: 'nsales/finishing-printing-pre-sales-contract',
        name: 'finishing-printing-sales-pre-contract',
        moduleId: './modules/sales/finishing-printing-pre-sales-contract/index',
        nav: true,
        title: 'Pre Sales Contract - Dyeing & Printing',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/finishing-printing-cost-calculation',
        name: 'finishing-printing-cost-calculation',
        moduleId: './modules/sales/finishing-printing-cost-calculation/index',
        nav: true,
        title: 'Cost Calculation - Dyeing & Printing',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/finishing-printing-cost-calculation-approval-ppic',
        name: 'finishing-printing-cost-calculation-approval-ppic',
        moduleId: './modules/sales/finishing-printing-cost-calculation-approval-ppic/index',
        nav: true,
        title: 'Cost Calculation - Dyeing & Printing - Approval PPIC',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/finishing-printing-cost-calculation-approval-md',
        name: 'finishing-printing-cost-calculation-approval-md',
        moduleId: './modules/sales/finishing-printing-cost-calculation-approval-md/index',
        nav: true,
        title: 'Cost Calculation - Dyeing & Printing - Approval Md',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nsales/finishing-printing-cost-calculation-copy',
        name: 'finishing-printing-cost-calculation-copy',
        moduleId: './modules/sales/finishing-printing-cost-calculation/copy/index',
        nav: true,
        title: 'Copy Cost Calculation - Dyeing & Printing',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nsales/shin-finishing-printing-sales-contract-copy',
        name: 'shin-finishing-printing-sales-contract-copy',
        moduleId: './modules/sales/shin-finishing-printing-sales-contract/copy/index',
        nav: true,
        title: 'Copy Sales Contract - Dyeing & Printing',
        auth: true,
        settings: {
            group: "nsales",
            permission: { /*"A2": 1,*/ "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/shin-finishing-printing-sales-contract',
        name: 'shin-finishing-printing-sales-contract',
        moduleId: './modules/sales/shin-finishing-printing-sales-contract/index',
        nav: true,
        title: 'Sales Contract - Dyeing & Printing (New)',
        auth: true,
        settings: {
            group: "nsales",
            permission: { /*"A2": 1,*/ "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    // {
    //     route: 'sales/reports/shin-finishing-printing-sales-contract-reports',
    //     name: 'shin-finishing-printing-sales-contract-report',
    //     moduleId: './modules/sales/reports/shin-finishing-printing-sales-contract-report/index',
    //     nav: true,
    //     title: 'Laporan Sales Contract - Dyeing & Printing (New)',
    //     auth: true,
    //     settings: {
    //         group: "sales",
    //         permission: { "A2": 1, "C9": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    // },
    {
        route: 'nsales/finishing-printing-sales-contract',
        name: 'finishing-printing-sales-contract',
        moduleId: './modules/sales/finishing-printing-sales-contract/index',
        nav: true,
        title: 'Sales Contract - Dyeing & Printing',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/reports/finishing-printing-sales-contract-reports',
        name: 'finishing-printing-sales-contract-report',
        moduleId: './modules/sales/reports/finishing-printing-sales-contract-report/index',
        nav: true,
        title: 'Laporan Sales Contract - Dyeing & Printing',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/weaving-sales-contract',
        name: 'weaving-sales-contract',
        moduleId: './modules/sales/weaving-sales-contract/index',
        nav: true,
        title: 'Sales Contract - Weaving',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/spinning-sales-contract',
        name: 'spinning-sales-contract',
        moduleId: './modules/sales/spinning-sales-contract/index',
        nav: true,
        title: 'Sales Contract - Spinning',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/delivery-note-production',
        name: 'delivery-note-production',
        moduleId: './modules/sales/delivery-note-production/index',
        nav: true,
        title: 'Surat Order Produksi - Spinning',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/reports/weaving-sales-contract-reports',
        name: 'weaving-sales-contract-report',
        moduleId: './modules/sales/reports/weaving-sales-contract-report/index',
        nav: true,
        title: 'Laporan Sales Contract - Weaving',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/reports/spinning-sales-contract-reports',
        name: 'spinning-sales-contract-report',
        moduleId: './modules/sales/reports/spinning-sales-contract-report/index',
        nav: true,
        title: 'Laporan Sales Contract - Spinning',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/shin-production-order',
        name: 'shin-production-order',
        moduleId: './modules/sales/shin-production-order/index',
        nav: true,
        title: 'Surat Perintah Produksi (New)',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/shin-production-order-list-view',
        name: 'shin-production-order-list-view',
        moduleId: './modules/sales/shin-production-order-list-view/index',
        nav: true,
        title: 'Surat Perintah Produksi (New)',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/shin-production-order-approval-md',
        name: 'shin-production-order-approval-md',
        moduleId: './modules/sales/shin-production-order-approval-md/index',
        nav: true,
        title: 'Validasi Surat Perintah Produksi (New) - Kabag Md',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/shin-production-order-approval-sample',
        name: 'shin-production-order-approval-sample',
        moduleId: './modules/sales/shin-production-order-approval-sample/index',
        nav: true,
        title: 'Validasi Surat Perintah Produksi (New) - Sample',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/production-order',
        name: 'production-order',
        moduleId: './modules/sales/production-order/index',
        nav: true,
        title: 'Surat Perintah Produksi',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/production-order-list-view',
        name: 'production-order-list-view',
        moduleId: './modules/sales/production-order-list-view/index',
        nav: true,
        title: 'Surat Perintah Produksi',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "F1": 1, "F2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/reports/production-order-reports',
        name: 'production-order-report',
        moduleId: './modules/sales/reports/production-order-report/index',
        nav: true,
        title: 'Monitoring Surat Perintah Produksi',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/do-sales',
        name: 'do-sales',
        moduleId: './modules/sales/do-sales/index',
        nav: true,
        title: 'DO Penjualan',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/do-stock',
        name: 'do-stock',
        moduleId: './modules/sales/do-stock/index',
        nav: true,
        title: 'DO Stock',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/do-aval',
        name: 'do-aval',
        moduleId: './modules/sales/do-aval/index',
        nav: true,
        title: 'DO Aval',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/sales-invoice',
        name: 'sales-invoice',
        moduleId: './modules/sales/sales-invoice/index',
        nav: true,
        title: 'Faktur Penjualan Lokal',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/sales-invoice-export',
        name: 'sales-invoice-export',
        moduleId: './modules/sales/sales-invoice-export/index',
        nav: true,
        title: 'Faktur Penjualan Ekspor',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/do-return',
        name: 'do-return',
        moduleId: './modules/sales/do-return/index',
        nav: true,
        title: 'DO Retur',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/reports/sales-monthly-reports',
        name: 'sales-monthly-report',
        moduleId: './modules/sales/reports/sales-monthly-report/index',
        nav: true,
        title: 'Sales Monthly Report / Laporan Sales Per Bulan',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/deal-tracking',
        name: 'deal-tracking',
        moduleId: './modules/sales/deal-tracking/index',
        nav: true,
        title: 'Deal Tracking',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "PGA": 1, "PA": 1, "PM": 1, "PE": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'nsales/order-status-report',
        name: 'order-status-report',
        moduleId: './modules/sales/reports/order-status-report/index',
        nav: true,
        title: 'Laporan Status Order',
        auth: true,
        settings: {
            group: "nsales",
            permission: { "A2": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
];
