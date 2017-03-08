module.exports = [
    {
        route: ['', 'Welcome'],
        name: 'welcome',
        moduleId: './welcome',
        nav: false,
        title: 'Home',
        auth: true,
        settings: { roles: ["*"] }
    },
    {
        route: 'efr-tb-bbt',
        name: 'efr-tb-bbt',
        moduleId: './modules/efr-tb-bbt-cr/index',
        nav: true,
        title: 'Pemasukan Barang Jadi',
        auth: true,
        settings: {
            group: "toko",
            permission: { "SLO.01": 7, "SLO.02": 7, "SLO.03": 7 },
            iconClass: 'fa fa-shopping-bag'
        }
    },
    {
        route: 'efr-tb-bat',
        name: 'efr-tb-bat',
        moduleId: './modules/efr-tb-bat-cr/index',
        nav: true,
        title: 'Pemasukan Embalase',
        auth: true,
        settings: {
            group: "toko",
            permission: { "SLO.01": 1, "SLO.02": 1, "SLO.03": 1 },
            iconClass: 'fa fa-shopping-bag'
        }
    },
    {
        route: 'efr-kb-rtp',
        name: 'efr-kb-rtp',
        moduleId: './modules/efr-kb-rtp-cr/index',
        nav: true,
        title: 'Retur Barang Ke Pusat',
        auth: true,
        settings: {
            group: "toko",
            permission: { "SLO.01": 1, "SLO.02": 1, "SLO.03": 1 },
            iconClass: 'fa fa-shopping-bag'
        }
    }]