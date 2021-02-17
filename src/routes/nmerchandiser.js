module.exports = [
    {
        route: '/nmerchandiser/garment-pre-sales-contract-by-user',
        name: 'garment-pre-sales-contract-by-user',
        moduleId: './modules/nmerchandiser/garment-pre-sales-contract/index',
        nav: true,
        title: 'Pre Sales Contract - Garment',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            byUser: true
        }
    },
    {
        route: '/nmerchandiser/garment-pre-sales-contract',
        name: 'garment-pre-sales-contract',
        moduleId: './modules/nmerchandiser/garment-pre-sales-contract/index',
        nav: true,
        title: 'Pre Sales Contract - Garment (Semua User)',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            byUser: false
        }
    },
    {
        route: '/nmerchandiser/garment-purchase-request-master-by-user',
        name: 'purchase-request-master-by-user',
        moduleId: './modules/nmerchandiser/garment-purchase-request-master/index',
        nav: true,
        title: 'PR Master',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            byUser: true
        }
    },
    {
        route: '/nmerchandiser/garment-purchase-request-master',
        name: 'purchase-request-master',
        moduleId: './modules/nmerchandiser/garment-purchase-request-master/index',
        nav: true,
        title: 'PR Master (Semua User)',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            byUser: false
        }
    },
    {
        route: '/nmerchandiser/approve-pr-master/kabag-md',
        name: 'approve-purchase-request-master',
        moduleId: './modules/nmerchandiser/approve-pr-master/index',
        nav: true,
        title: 'Approval PR Master - Kabag Md',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            type: "MD1"
        }
    },
    {
        route: '/nmerchandiser/approve-pr-master/purchasing',
        name: 'approve-purchase-request-master',
        moduleId: './modules/nmerchandiser/approve-pr-master/index',
        nav: true,
        title: 'Approval PR Master - Purchasing',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PG": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            type: "Purchasing"
        }
    },
    {
        route: '/nmerchandiser/approve-pr-master/kadiv-md',
        name: 'approve-purchase-request-master',
        moduleId: './modules/nmerchandiser/approve-pr-master/index',
        nav: true,
        title: 'Approval PR Master - Kadiv Md',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            type: "MD2"
        }
    },
    {
        route: '/nmerchandiser/cost-calculation-by-user',
        name: 'cost-calculation-by-user',
        moduleId: './modules/nmerchandiser/cost-calculation/index',
        nav: true,
        title: 'Cost Calculation Export Garment',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            byUser: true
        }
    },
    {
        route: '/nmerchandiser/cost-calculation',
        name: 'cost-calculation',
        moduleId: './modules/nmerchandiser/cost-calculation/index',
        nav: true,
        title: 'Cost Calculation Export Garment (Semua User)',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "B7": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            byUser: false
        }
    },
    {
        route: '/nmerchandiser/cost-calculation-approval/md',
        name: 'cost-calculation-approval-md',
        moduleId: './modules/nmerchandiser/cost-calculation-approval/index',
        nav: true,
        title: 'Cost Calculation Approval - Kabag Md',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            type: "md"
        }
    },
    {
        route: '/nmerchandiser/cost-calculation-approval/ie',
        name: 'cost-calculation-approval-ie',
        moduleId: './modules/nmerchandiser/cost-calculation-approval/index',
        nav: true,
        title: 'Cost Calculation Approval - IE',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "IE": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            type: "ie"
        }
    },
    {
        route: '/nmerchandiser/budget-validation-purchasing',
        name: 'budget-validation-purchasing',
        moduleId: './modules/nmerchandiser/budget-validation-purchasing/index',
        nav: true,
        title: 'Validasi Budget - Purchasing',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PG": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/nmerchandiser/cost-calculation-approval/kadivmd',
        name: 'cost-calculation-approval-kadivmd',
        moduleId: './modules/nmerchandiser/cost-calculation-approval/index',
        nav: true,
        title: 'Cost Calculation Approval - Kadiv Md',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            type: "kadivmd"
        }
    },
    {
        route: '/nmerchandiser/budget-validation-process',
        name: 'budget-validation-process',
        moduleId: './modules/nmerchandiser/budget-validation-process/index',
        nav: true,
        title: 'Validasi Budget - PROSES',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/nmerchandiser/garment-sales-contract-by-user',
        name: 'garment-sales-contract-by-user',
        moduleId: './modules/nmerchandiser/garment-sales-contract/index',
        nav: true,
        title: 'Sales Contract Per RO',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            byUser: true
        }
    },
    {
        route: '/nmerchandiser/garment-sales-contract',
        name: 'garment-sales-contract',
        moduleId: './modules/nmerchandiser/garment-sales-contract/index',
        nav: true,
        title: 'Sales Contract Per RO (Semua User)',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            byUser: false
        }
    },
    {
        route: '/nmerchandiser/ro-garment-by-user',
        name: 'ro-garment-by-user',
        moduleId: './modules/nmerchandiser/ro-garment/index',
        nav: true,
        title: 'RO Export Garment',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            byUser: true
        }
    },
    {
        route: '/nmerchandiser/ro-garment',
        name: 'ro-garment',
        moduleId: './modules/nmerchandiser/ro-garment/index',
        nav: true,
        title: 'RO Export Garment (Semua User)',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            byUser: false
        }
    },
    {
        route: '/nmerchandiser/ro-validation-kabagmd',
        name: 'ro-validation-kabagmd',
        moduleId: './modules/nmerchandiser/ro-validation/index',
        nav: true,
        title: 'Validasi RO - Kabag Md',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            type: 'kabagmd'
        }
    },
    {
        route: '/nmerchandiser/ro-sample-validation',
        name: 'ro-sample-validation',
        moduleId: './modules/nmerchandiser/ro-validation/index',
        nav: true,
        title: 'Validasi RO Sample',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "IE": 1, "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator',
            type: 'sample'
        }
    },
    // {
    //     route: '/merchandiser/ro-validation-ppic',
    //     name: 'ro-validation-ppic',
    //     moduleId: './modules/merchandiser/ro-validation-ppic/index',
    //     nav: true,
    //     title: 'Validasi RO - PPIC',
    //     auth: true,s
    //     settings: {
    //         group: "merchandiser",
    //         permission: { "PGA": 1, "C9": 1 },
    //         iconClass: 'fa fa-calculator'
    //     }
    // },
    {
        route: '/nmerchandiser/ro-acceptance',
        name: 'ro-acceptance',
        moduleId: './modules/nmerchandiser/ro-acceptance/index',
        nav: true,
        title: 'Penerimaan RO',
        auth: true,
        settings: {
            group: "nmerchandiser",
           permission: { "P": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/nmerchandiser/ro-available',
        name: 'ro-available',
        moduleId: './modules/nmerchandiser/ro-available/index',
        nav: true,
        title: 'Kesiapan RO',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "P": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/nmerchandiser/ro-distribute',
        name: 'ro-distribute',
        moduleId: './modules/nmerchandiser/ro-distribute/index',
        nav: true,
        title: 'Distribusi RO',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "P": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/nmerchandiser/cost-calculation-copy',
        name: 'cost-calculation-copy',
        moduleId: './modules/nmerchandiser/cost-calculation/copy/index',
        nav: true,
        title: 'Copy Cost Calculation',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/nmerchandiser/garment-sales-contract-copy',
        name: 'garment-sales-contract-copy',
        moduleId: './modules/nmerchandiser/garment-sales-contract/copy/index',
        nav: true,
        title: 'Copy Sales Contract Per RO',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/nmerchandiser/ro-garment-copy',
        name: 'ro-garment-copy',
        moduleId: './modules/nmerchandiser/ro-garment/copy/index',
        nav: true,
        title: 'Copy RO Garment',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: 'nmerchandiser/monitoring-ro-job-order',
        name: 'merchandiser-monitoring-ro-job-order',
        moduleId: './modules/garment-purchasing/monitoring-ro-job-order/index',
        nav: true,
        title: 'Monitoring RO Job Order',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "PG": 1, "GU": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/garment-cost-calculation-by-unit-report',
        name: 'garment-cost-calculation-by-unit-report',
        moduleId: './modules/nmerchandiser/report/cost-calculation-garment-by-unit-report/index',
        nav: true,
        title: 'Display Cost Calculation Garment Per Unit',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: {  "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/garment-cost-calculation-by-section-report',
        name: 'garment-cost-calculation-by-section-report',
        moduleId: './modules/nmerchandiser/report/cost-calculation-garment-by-section-report/index',
        nav: true,
        title: 'Display Cost Calculation Garment Per Seksi',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: {  "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/garment-cost-calculation-by-buyer-report',
        name: 'garment-cost-calculation-by-buyer-report',
        moduleId: './modules/nmerchandiser/report/cost-calculation-garment-by-buyer-report/index',
        nav: true,
        title: 'Display Cost Calculation Garment Per Buyer - Deskripsi',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: {  "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
     {
        route: '/nmerchandiser/garment-cost-calculation-by-sc-report',
        name: 'garment-cost-calculation-by-sc-report',
        moduleId: './modules/nmerchandiser/report/cost-calculation-garment-by-sc-report/index',
        nav: true,
        title: 'Display Cost Calculation Garment Per Buyer - Sales Contract',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: {  "PGA": 1, "C5": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/budget-job-order-report',
        name: 'budget-job-order-report',
        moduleId: './modules/nmerchandiser/report/budget-job-order-report/index',
        nav: true,
        title: 'Display Budget Job Order',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "PG": 1, "P": 1, "GU": 1, "B7": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/budget-master-sample-report',
        name: 'budget-master-sample-report',
        moduleId: './modules/nmerchandiser/report/budget-master-sample-report/index',
        nav: true,
        title: 'Display Budget Master / Sample',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "PG": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/monitoring-unpost-cost-calculation',
        name: 'monitoring-unpost-cost-calculation',
        moduleId: './modules/nmerchandiser/report/monitoring-unpost-cost-calculation/index',
        nav: true,
        title: 'Monitoring Unpost Cost Calculation',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/production-order-report',
        name: 'production-order-report',
        moduleId: './modules/nmerchandiser/report/production-order-report/index',
        nav: true,
        title: 'Laporan Order Produksi',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "B7": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/accepted-ro-report',
        name: 'accepted-ro-report',
        moduleId: './modules/nmerchandiser/report/accepted-ro-report/index',
        nav: true,
        title: 'Laporan Penerimaan RO',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "P": 1, "B7": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/available-ro-report',
        name: 'available-ro-report',
        moduleId: './modules/nmerchandiser/report/available-ro-report/index',
        nav: true,
        title: 'Laporan Kecepatan Cek RO',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "P": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
     {
        route: '/nmerchandiser/distribution-ro-garment-report',
        name: 'distribution-ro-garment-report',
        moduleId: './modules/nmerchandiser/report/distribution-ro-garment-report/index',
        nav: true,
        title: 'Laporan Distribusi RO Garment',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: {  "P": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },    
    {
        route: '/nmerchandiser/available-budget-report',
        name: 'available-budget-report',
        moduleId: './modules/nmerchandiser/report/available-budget-report/index',
        nav: true,
        title: 'Laporan Kesiapan Budget',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "P": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/available-ro-garment-report',
        name: 'available-ro-garment-report',
        moduleId: './modules/nmerchandiser/report/available-ro-garment-report/index',
        nav: true,
        title: 'Laporan Kesiapan RO',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "P": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/monitoring-pre-sales-contract',
        name: 'monitoring-pre-sales-contract',
        moduleId: './modules/nmerchandiser/report/monitoring-pre-sales-contract/index',
        nav: true,
        title: 'Monitoring Pre Sales Contract',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/garment-purchasing-quality-objective-report',
        name: 'garment-purchasing-quality-objective-report',
        moduleId: './modules/nmerchandiser/report/garment-purchasing-quality-objective-report/index',
        nav: true,
        title: 'Laporan Sasaran Mutu Penjualan Garment',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/profit-garment-by-section-report',
        name: 'profit-garment-by-section-report',
        moduleId: './modules/nmerchandiser/report/profit-garment-by-section-report/index',
        nav: true,
        title: 'Laporan Profit Garment Per Seksi',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/profit-garment-by-comodity-report',
        name: 'profit-garment-by-comodity-report',
        moduleId: './modules/nmerchandiser/report/profit-garment-by-comodity-report/index',
        nav: true,
        title: 'Laporan Profit Garment Per Komoditi',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/budget-export-garment-report',
        name: 'budget-export-garment-report',
        moduleId: './modules/nmerchandiser/report/budget-export-garment-report/index',
        nav: true,
        title: 'Monitoring Budget Export Garment',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "PG": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/cc-ro-garment-history-report',
        name: 'cc-ro-garment-history-report',
        moduleId: './modules/nmerchandiser/report/cc-ro-garment-history-by-section-report/index',
        nav: true,
        title: 'Monitoring History Cost Calculatin & Budget Garment',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/open-po-master',
        name: 'open-po-master',
        moduleId: './modules/nmerchandiser/open-po-master/index',
        nav: true,
        title: 'Open PO Master',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmerchandiser/open-po-master-approval/kabag-md',
        name: 'open-po-master-approval-kabag-md',
        moduleId: './modules/nmerchandiser/open-po-master-approval/index',
        nav: true,
        title: 'Approval Open PO Master - Kabag Md',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard',
            type: "kabag_md"
        }
    },
    {
        route: '/nmerchandiser/open-po-master-approval/purchasing',
        name: 'open-po-master-approval-purchasing',
        moduleId: './modules/nmerchandiser/open-po-master-approval/index',
        nav: true,
        title: 'Approval Open PO Master - Purchasing',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard',
            type: "purchasing"
        }
    },
    {
        route: '/nmerchandiser/open-po-master-approval/kadiv-md',
        name: 'open-po-master-approval-kadiv-md',
        moduleId: './modules/nmerchandiser/open-po-master-approval/index',
        nav: true,
        title: 'Approval Open PO Master - Kadiv Md',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-dashboard',
            type: "kadiv_md"
        }
    },
    {
        route: '/nmerchandiser/unit-delivery-order-marketing',
        name: 'unit-delivery-order-marketing',
        moduleId: './modules/nmerchandiser/unit-delivery-order-marketing/index',
        nav: true,
        title: 'DO Marketing',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/nmerchandiser/packing-list-draft-approval',
        name: 'packing-list-draft-approval',
        moduleId: './modules/nmerchandiser/packing-list-draft-approval/index',
        nav: true,
        title: 'Approval Draft Packing List - Md',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/nmerchandiser/packing-list-approval',
        name: 'packing-list-approval',
        moduleId: './modules/nmerchandiser/packing-list-approval/index',
        nav: true,
        title: 'Approval Packing List - Md',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/nmerchandiser/packing-list',
        name: 'packing-list',
        moduleId: './modules/nmerchandiser/packing-list/index',
        nav: true,
        title: 'Approved Packing List - Md',
        auth: true,
        settings: {
            group: "nmerchandiser",
            permission: { "PGA": 1, "SG": 1, "C9": 1, "C.01": 1 },
            iconClass: 'fa fa-calculator'
        }
    }
];
