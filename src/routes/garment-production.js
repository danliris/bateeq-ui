module.exports = [
    {
        route: '/garment-production/comodity-price',
        name: 'comodity-price',
        moduleId: './modules/garment-production/comodity-price/index',
        nav: true,
        title: 'Master Tarif',
        auth: true,
        settings: {
            group: "g-production",
            //permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission: { "C.01": 1, "ACC.01" : 1, "C5" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },{
        route: '/garment-production/scrap-source',
        name: 'production-scrap-source',
        moduleId: './modules/garment-production/scrap-source/index',
        nav: true,
        title: 'Master Asal Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-classifications',
        name: 'production-scrap-classifications',
        moduleId: './modules/garment-production/scrap-classification/index',
        nav: true,
        title: 'Master Jenis Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            //permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-destinations',
        name: 'production-scrap-destinations',
        moduleId: './modules/garment-production/scrap-destination/index',
        nav: true,
        title: 'Master Tujuan Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/preparing',
        name: 'preparing',
        moduleId: './modules/garment-production/preparing/index',
        nav: true,
        title: 'Preparing',
        auth: true,
        settings: {
            group: "g-production",
            // permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1, "PRD.01" : 1 },
            permission: { "C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/preparing-alluser',
        name: 'preparing',
        moduleId: './modules/garment-production/preparing_alluser/index',
        nav: true,
        title: 'Preparing (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            //permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission: { "C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/delivery-return',
        name: 'production-delivery-return',
        moduleId: './modules/garment-production/delivery-return/index',
        nav: true,
        title: 'Retur Proses',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission : {"C.01": 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/delivery-return-alluser',
        name: 'production-delivery-return-alluser',
        moduleId: './modules/garment-production/delivery-return-alluser/index',
        nav: true,
        title: 'Retur Proses (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission : {"C.01": 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-product',
        name: 'aval-product',
        moduleId: './modules/garment-production/aval-product/index',
        nav: true,
        title: 'Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            //permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-product-alluser',
        name: 'aval-product',
        moduleId: './modules/garment-production/aval-product-alluser/index',
        nav: true,
        title: 'Barang Aval (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            //permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/cutting-in',
        name: 'production-cutting-in',
        moduleId: './modules/garment-production/cutting-in/index',
        nav: true,
        title: 'Cutting-In',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission: { "C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/cutting-in-alluser',
        name: 'production-cutting-in-alluser',
        moduleId: './modules/garment-production/cutting-in-alluser/index',
        nav: true,
        title: 'Cutting-In (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission: { "C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/cutting-out',
        name: 'production-cutting-out',
        moduleId: './modules/garment-production/cutting-out/index',
        nav: true,
        title: 'Cutting-Out',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/cutting-out-alluser',
        name: 'production-cutting-out-alluser',
        moduleId: './modules/garment-production/cutting-out-alluser/index',
        nav: true,
        title: 'Cutting-Out (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission : {"C.01": 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/subcon-cutting-out',
        name: 'production-subcon-cutting-out',
        moduleId: './modules/garment-production/subcon-cutting-out/index',
        nav: true,
        title: 'Cutting-Out Subkon',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/subcon-cutting-out-alluser',
        name: 'production-subcon-cutting-out-alluser',
        moduleId: './modules/garment-production/subcon-cutting-out-alluser/index',
        nav: true,
        title: 'Cutting-Out Subkon (Semua User)',
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-component',
        name: 'production-aval-component',
        moduleId: './modules/garment-production/aval-component/index',
        nav: true,
        title: 'Aval Komponen',

        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-do',
        name: 'production-sewing-do',
        moduleId: './modules/garment-production/sewing-do/index',
        nav: true,
        title: 'Sewing DO',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission : {"C.01" : 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-do-alluser',
        name: 'production-sewing-do-alluser',
        moduleId: './modules/garment-production/sewing-do-alluser/index',
        nav: true,
        title: 'Sewing DO (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission : {"C.01" : 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/loading',
        name: 'production-loading',
        moduleId: './modules/garment-production/loading/index',
        nav: true,
        title: 'Loading',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission : {"C.01" : 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/loading-alluser',
        name: 'production-loading-alluser',
        moduleId: './modules/garment-production/loading-alluser/index',
        nav: true,
        title: 'Loading (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission : {"C.01" : 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-in',
        name: 'production-sewing-in',
        moduleId: './modules/garment-production/sewing-in/index',
        nav: true,
        title: 'Sewing In',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-in-alluser',
        name: 'production-sewing-in-alluse',
        moduleId: './modules/garment-production/sewing-in-alluser/index',
        nav: true,
        title: 'Sewing In (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-out',
        name: 'production-sewing-out',
        moduleId: './modules/garment-production/sewing-out/index',
        nav: true,
        title: 'Sewing Out',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-out-alluser',
        name: 'production-sewing-out-alluser',
        moduleId: './modules/garment-production/sewing-out-alluser/index',
        nav: true,
        title: 'Sewing Out (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/finishing-in',
        name: 'production-finishing-in',
        moduleId: './modules/garment-production/finishing-in/index',
        nav: true,
        title: 'Finishing In',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            // permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/finishing-in-alluser',
        name: 'production-finishing-in-alluser',
        moduleId: './modules/garment-production/finishing-in-alluser/index',
        nav: true,
        title: 'Finishing In (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/subcon-finishing-in',
        name: 'production-subcon-finishing-in',
        moduleId: './modules/garment-production/subcon-finishing-in/index',
        nav: true,
        title: 'Finishing In Subkon',
        auth: true,
        settings: {
            group: "g-production",
           // permission: { "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/subcon-finishing-in-alluser',
        name: 'production-subcon-finishing-in-alluser',
        moduleId: './modules/garment-production/subcon-finishing-in-alluser/index',
        nav: true,
        title: 'Finishing In Subkon (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            permission: { "C.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/finishing-out',
        name: 'production-finishing-out',
        moduleId: './modules/garment-production/finishing-out/index',
        nav: true,
        title: 'Finishing Out',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/finishing-out-alluser',
        name: 'production-finishing-out-alluser',
        moduleId: './modules/garment-production/finishing-out-alluser/index',
        nav: true,
        title: 'Finishing Out (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/expenditure-good',
        name: 'production-expenditure-good',
        moduleId: './modules/garment-production/expenditure-good/index',
        nav: true,
        title: 'Pengeluaran Barang Jadi',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/expenditure-good-alluser',
        name: 'production-expenditure-good-alluser',
        moduleId: './modules/garment-production/expenditure-good-alluser/index',
        nav: true,
        title: 'Pengeluaran Barang Jadi (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/expenditure-good-return',
        name: 'production-expenditure-good-return',
        moduleId: './modules/garment-production/expenditure-good-return/index',
        nav: true,
        title: 'Retur Barang Jadi',
        auth: true,
        settings: {
            group: "g-production",

            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/expenditure-good-return-alluser',
        name: 'production-expenditure-good-return-alluser',
        moduleId: './modules/garment-production/expenditure-good-return-alluser/index',
        nav: true,
        title: 'Retur Barang Jadi (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-component',
        name: 'production-aval-component',
        moduleId: './modules/garment-production/aval-component/index',
        nav: true,
        title: 'Aval Komponen',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission: { "C.01": 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-component-alluser',
        name: 'production-aval-component-alluser',
        moduleId: './modules/garment-production/aval-component-alluser/index',
        nav: true,
        title: 'Aval Komponen (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission : {"C.01" : 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-transaction-in',
        name: 'production-scrap-transaction-in',
        moduleId: './modules/garment-production/scrap-transaction-in/index',
        nav: true,
        title: 'Penerimaan Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-transaction-in-alluser',
        name: 'production-scrap-transaction-in-alluser',
        moduleId: './modules/garment-production/scrap-transaction-in-alluser/index',
        nav: true,
        title: 'Penerimaan Barang Aval (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-transaction-out',
        name: 'production-scrap-transaction-out',
        moduleId: './modules/garment-production/scrap-transaction-out/index',
        nav: true,
        title: 'Pengeluaran Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-transaction-out-alluser',
        name: 'production-scrap-transaction-out-alluser',
        moduleId: './modules/garment-production/scrap-transaction-out-alluser/index',
        nav: true,
        title: 'Pengeluaran Barang Aval (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-loading',
        name: 'production-adjustment-loading',
        moduleId: './modules/garment-production/adjustment-loading/index',
        nav: true,
        title: 'Adjustment Loading',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission : {"C.01" : 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-loading-alluser',
        name: 'production-adjustment-loading-alluser',
        moduleId: './modules/garment-production/adjustment-loading-alluser/index',
        nav: true,
        title: 'Adjustment Loading (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            permission : {"C.01" : 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-sewing',
        name: 'production-adjustment-sewing',
        moduleId: './modules/garment-production/adjustment-sewing/index',
        nav: true,
        title: 'Adjustment Sewing',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-sewing-alluser',
        name: 'production-adjustment-sewing-alluser',
        moduleId: './modules/garment-production/adjustment-sewing-alluser/index',
        nav: true,
        title: 'Adjustment Sewing (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-finishing',
        name: 'production-adjustment-finishing',
        moduleId: './modules/garment-production/adjustment-finishing/index',
        nav: true,
        title: 'Adjustment Finishing',
        auth: true,
        settings: {
            group: "g-production",
           permission: {"C.01": 1, "PRD.01" : 1 },
            // permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-finishing-alluser',
        name: 'production-adjustment-finishing-alluser',
        moduleId: './modules/garment-production/adjustment-finishing-alluser/index',
        nav: true,
        title: 'Adjustment Finishing (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-expenditure-good',
        name: 'production-adjustment-expenditure-good',
        moduleId: './modules/garment-production/adjustment-expenditure-good/index',
        nav: true,
        title: 'Adjustment Barang Jadi',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            // permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-expenditure-good-alluser',
        name: 'production-adjustment-expenditure-good-alluser',
        moduleId: './modules/garment-production/adjustment-expenditure-good-alluser/index',
        nav: true,
        title: 'Adjustment Barang Jadi (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
           permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-prepare',
        name: 'production-monitoring-prepare',
        moduleId: './modules/garment-production/monitoring-prepare/index',
        nav: true,
        title: 'Monitoring Prepare',
        auth: true,
        settings: {
            group: "g-production",
           // permission: {"C.01": 1, "PRD.01" : 1 },
           
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-prepare-bookkeeping',
        name: 'production-monitoring-prepare-bookkeeping',
        moduleId: './modules/garment-production/monitoring-prepare-bookkeeping/index',
        nav: true,
        title: 'Monitoring Prepare Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            //permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-cutting',
        name: 'production-monitoring-cutting',
        moduleId: './modules/garment-production/monitoring-cutting/index',
        nav: true,
        title: 'Monitoring Cutting',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-cutting-bookkeeping',
        name: 'production-monitoring-cutting-bookkeeping',
        moduleId: './modules/garment-production/monitoring-cutting-bookkeeping/index',
        nav: true,
        title: 'Monitoring Cutting Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-loading',
        name: 'production-monitoring-loading',
        moduleId: './modules/garment-production/monitoring-loading/index',
        nav: true,
        title: 'Monitoring Loading',
        auth: true,
        settings: {
            group: "g-production",
           // permission: {"C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
           permission : {"C.01" : 1, "PRD.01" : 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-loading-bookkeeping',
        name: 'production-monitoring-loading-bookkeeping',
        moduleId: './modules/garment-production/monitoring-loading-bookkeeping/index',
        nav: true,
        title: 'Monitoring Loading Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
           // permission: {"C9": 1, "B1":1},
            permission : {"C.01" : 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-sewing',
        name: 'production-monitoring-sewing',
        moduleId: './modules/garment-production/monitoring-sewing/index',
        nav: true,
        title: 'Monitoring Sewing',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },{
        route: '/garment-production/monitoring-sewing-bookkeeping',
        name: 'production-monitoring-sewing-bookkeeping',
        moduleId: './modules/garment-production/monitoring-sewing-bookkeeping/index',
        nav: true,
        title: 'Monitoring Sewing Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-finishing',
        name: 'production-monitoring-finishing',
        moduleId: './modules/garment-production/monitoring-finishing/index',
        nav: true,
        title: 'Monitoring Finishing',
        auth: true,
        settings: {
            group: "g-production",
          //  permission: {"C.01": 1, "PRD.01" : 1 },
             
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-finishing-bookkeeping',
        name: 'production-monitoring-finishing-bookkeeping',
        moduleId: './modules/garment-production/monitoring-finishing-bookkeeping/index',
        nav: true,
        title: 'Monitoring Finishing Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            // permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-expenditure-good-delivery',
        name: 'production-monitoring-expenditure-good-delivery',
        moduleId: './modules/garment-production/monitoring-expenditure-good-delivery/index',
        nav: true,
        title: 'Monitoring Pengiriman Barang Jadi',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C.01": 1, "PRD.01" : 1 },
           
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-expenditure-good-delivery-bookkeeping',
        name: 'production-monitoring-expenditure-good-delivery-bookkeeping',
        moduleId: './modules/garment-production/monitoring-expenditure-good-delivery-bookkeeping/index',
        nav: true,
        title: 'Monitoring Pengiriman Barang Jadi Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitorinproduction-flow-by-size',
        name: 'production-monitorinproduction-flow-by-size',
        moduleId: './modules/garment-production/monitorinproduction-flow-by-size/index',
        nav: true,
        title: 'Monitoring Flow Produksi per Size',
        auth: true,
        settings: {
            group: "g-production",
           //  permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitorinproduction-flow-by-size-bookkeeping',
        name: 'production-monitorinproduction-flow-by-size-bookkeeping',
        moduleId: './modules/garment-production/monitorinproduction-flow-by-size-bookkeeping/index',
        nav: true,
        title: 'Monitoring Flow Produksi per Size Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            // permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitorinproduction-stock-flow',
        name: 'production-monitorinproduction-stock-flow',
        moduleId: './modules/garment-production/monitorinproduction-stock-flow/index',
        nav: true,
        title: 'Monitoring Flow Persediaan',
        auth: true,
        settings: {
            group: "g-production",
           //  permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitorinproduction-stock-flow-bookkeeping',
        name: 'production-monitorinproduction-stock-flow-bookkeeping',
        moduleId: './modules/garment-production/monitorinproduction-stock-flow-bookkeeping/index',
        nav: true,
        title: 'Monitoring Flow Persediaan Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
           //  permission: {"C9": 1, "B1":1},
           
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/garment-production-flow-feature',
        name: 'production-production-flow-feature',
        moduleId: './modules/garment-production/garment-production-flow-feature/index',
        nav: true,
        title: 'Fitur Flow Barang Produksi',
        auth: true,
        settings: {
            group: "g-production",
            // permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/change-date-feature',
        name: 'production-change-date-feature',
        moduleId: './modules/garment-production/change-date-feature/index',
        nav: true,
        title: 'Fitur Ubah Tanggal',
        auth: true,
        settings: {
            group: "g-production",
            // permission: {"C.01": 1, "PRD.01" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: "production/packing-list",
        name: "production/packing-list",
        moduleId: "modules/garment-production/packing-list/index",
        nav: true,
        title: "Packing List",
        auth: true,
        settings: {
            group: "g-production",
            // permission: { "C.01": 1},
            iconClass: "fa fa-dashboard"
        }
    },
]