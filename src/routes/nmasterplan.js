module.exports = [
    {
        route: '/nmasterplan/max-wh-confirm',
        name: 'max-wh-confirm,',
        moduleId: './modules/nmaster-plan/max-wh-confirm/index',
        nav: true,
        title: 'Maksimal WH Confirm',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "C.01": 1, "PIC.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },    
    {
        route: '/nmasterplan/standard-minute-value',
        name: 'standard-hour',
        moduleId: './modules/nmaster-plan/standard-hour/index',
        nav: true,
        title: 'Standard Minute Value',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "C.01": 1, "ENG.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
     // {
    //     route: '/nmaster-plan/standard-minute-value-list',
    //     name: 'standard-hour',
    //     moduleId: './modules/nmaster-plan/standard-hour-list/index',
    //     nav: true,
    //     title: 'Standard Minute Value',
    //     auth: true,
    //     settings: {
    //         group: "nmasterplan",
    //         permission: { "*": 1 },
    //         //permission: { "PGA": 1, "B7": 1,"C9": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    // }
    {
        route: '/garment-master-plan/garment-section',
        name: 'garment-section',
        moduleId: './modules/nmaster-plan/garment-section/index',
        nav: true,
        title: 'Master Seksi',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "C.01": 1, "ENG.01": 1, "MRD.01": 1 },
            //permission: { "PGA": 1, "IE": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/master-plan-comodity',
        name: 'master-plan-comodity',
        moduleId: './modules/nmaster-plan/master-plan-comodity/index',
        nav: true,
        title: 'Komoditi',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "C.01": 1, "ENG.01": 1, "MRD.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/booking-order',
        name: 'booking-order',
        moduleId: './modules/nmaster-plan/booking-order/index',
        nav: true,
        title: 'Booking Order',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "C.01": 1, "MRD.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/booking-order-view',
        name: 'booking-order',
        moduleId: './modules/nmaster-plan/booking-order-view/index',
        nav: true,
        title: 'VIew Booking Order',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "C.01": 1, "PIC.01": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/booking-order-expired',
        name: 'booking-order-expired',
        moduleId: './modules/nmaster-plan/booking-order-expired/index',
        nav: true,
        title: 'Booking Order Expired',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "C.01": 1, "MRD.01": 1, "PIC.01": 1 },
            //permission: { "PGA": 1, "B7": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/monitoring-booking-order',
        name: 'monitoring-booking-order',
        moduleId: './modules/nmaster-plan/monitoring-booking-order/index',
        nav: true,
        title: 'Monitoring Booking Order',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "C.01": 1, "MRD.01": 1, "PIC.01" : 1, "ENG.01": 1 },
            //permission: { "PGA": 1, "B7": 1, "IE": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/weekly-plan',
        name: 'weekly-plan',
        moduleId: './modules/nmaster-plan/weekly-plan/index',
        nav: true,
        title: 'Master Minggu',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "C.01": 1,"PIC.01": 1 },
            //permission: { "B7": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    { 
        route: '/nmaster-plan/sewing-blocking-plan',
        name: 'sewing-blocking-plan',
        moduleId: './modules/nmaster-plan/sewing-blocking-plan/index',
        nav: true,
        title: 'Blocking Plan Sewing',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "C.01": 1,"PIC.01": 1 },
            // permission: { "B7": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/monitoring-remaining-eh',
        name: 'monitoring-remaining-eh',
        moduleId: './modules/nmaster-plan/monitoring-remaining-eh/index',
        nav: true,
        title: 'Monitoring Remaining EH',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "MRD.01": 1, "PIC.01": 1, "ENG.01": 1,"C.01": 1 },
            //permission: { "PGA": 1, "B7": 1, "IE": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/monitoring-master-plan',
        name: 'monitoring-master-plan',
        moduleId: './modules/nmaster-plan/monitoring-master-plan/index',
        nav: true,
        title: 'Report Master Plan',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "MRD.01": 1, "PIC.01": 1, "C.01": 1 },
            //permission: { "PGA": 1, "B7": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/accepted-order-monitoring',
        name: 'accepted-order-monitoring',
        moduleId: './modules/nmaster-plan/accepted-order-monitoring/index',
        nav: true,
        title: 'Monitoring Order Diterima dan Booking',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "MRD.01": 1, "PIC.01": 1, "ENG.01": 1,"C.01": 1 },
            // permission: { "PGA": 1,"B7": 1,"IE": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/booking-orders-canceled-monitoring',
        name: 'booking-orders-canceled-monitoring',
        moduleId: './modules/nmaster-plan/monitoring-canceled-booking-order/index',
        nav: true,
        title: 'Monitoring Canceled Booking Order',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "MRD.01": 1, "PIC.01": 1, "ENG.01": 1,"C.01": 1 },
            //permission: { "PGA": 1,"B7": 1, "IE": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/over-schedule-monitoring',
        name: 'over-schedule-monitoring',
        moduleId: './modules/nmaster-plan/over-schedule-monitoring/index',
        nav: true,
        title: 'Monitoring Keterlambatan Jadwal Pengerjaan',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "MRD.01": 1, "PIC.01": 1, "ENG.01": 1,"C.01": 1 },
            //permission: { "PGA": 1,"B7": 1, "IE": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/nmaster-plan/weekly-working-schedule-monitoring',
        name: 'weekly-working-schedule-monitoring',
        moduleId: './modules/nmaster-plan/weekly-working-schedule-monitoring/index',
        nav: true,
        title: 'Monitoring Jadwal Pengerjaan Per Week',
        auth: true,
        settings: {
            group: "nmasterplan",
            //permission: { "*": 1 },
            permission: { "MRD.01": 1, "PIC.01": 1, "ENG.01": 1,"C.01": 1 },
            //permission: { "PGA": 1,"B7": 1, "IE": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
];