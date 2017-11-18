module.exports = [
    // {
    //     route: 'power-bi',
    //     name: 'power-bi',
    //     moduleId: './modules/power-bi/index',
    //     nav: true,
    //     title: 'Power BI Reports',
    //     auth: true,
    //     settings: {
    //         group: "dashboard",
    //         permission: { "PJL1": 7 },
    //         iconClass: 'fa fa-bar-chart'
    //     }
    // },
//     {
//         route: 'daily-omzet',
//         name: 'daily-omzet',
//         moduleId: './modules/daily-omzet/index',
//         nav: true,
//         title: 'Omset Harian',
//         auth: true,
//         settings: {
//             group: "dashboard",
//             permission: { "PJL1": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
//         }
//     },
    {
        route: 'daily-omzet',
        name: 'daily-omzet',
        moduleId: './modules/daily-omzet/index',
        nav: true,
        title: 'Omset Harian (Per Toko)',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "SBY.06": 1, "PJL1": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
        }
    },
    {
        route: 'daily-omzet-sales-category',
        name: 'daily-omzet-sales-category',
        moduleId: './modules/daily-omzet-sales-category/index',
        nav: true,
        title: 'Omset Harian (Per Jenis Toko)',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "SBY.06": 1, "PJL1": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
        }
    },
    {
        route: 'daily-product-sales-store',
        name: 'daily-product-sales-store',
        moduleId: './modules/daily-product-sales-store/index',
        nav: true,
        title: 'Penjualan Harian (Per Toko Per RO)',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "SBY.06": 1, "PJL1": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
        }
    },
    {
        route: 'daily-product-sales-product',
        name: 'daily-product-sales-product',
        moduleId: './modules/daily-product-sales-product/index',
        nav: true,
        title: 'Penjualan Harian (Per Produk)',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "SBY.06": 1, "PJL1": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
        }
    },
    {
        route: 'daily-omzet-1',
        name: 'daily-omzet-1',
        moduleId: './modules/daily-omzet-1/index',
        nav: true,
        title: 'Omset Kemarin (Per Toko)',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "SBY.06": 1, "PJL1": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
        }
    },
    {
        route: 'daily-product-sales-product-1',
        name: 'daily-product-sales-product-1',
        moduleId: './modules/daily-product-sales-product-1/index',
        nav: true,
        title: 'Penjualan Kemarin (Per Produk)',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "SBY.06": 1, "PJL1": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
        }
    },
    {
        route: 'target-omset',
        name: 'target-omset',
        moduleId: './modules/target-omset/index',
        nav: true,
        title: 'Target Omset',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "PJL1": 1 },
            iconClass: 'fa fa-bar-chart'
        }
    },
    {
        route: 'penjualan',
        name: 'penjualan',
        moduleId: './modules/penjualan/index',
        nav: true,
        title: 'Penjualan',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "PJL1": 1 },
            iconClass: 'fa fa-bar-chart'
        }
    },
    {
        route: 'keuangan',
        name: 'keuangan',
        moduleId: './modules/keuangan/index',
        nav: true,
        title: 'Keuangan',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "PJL1": 1 },
            iconClass: 'fa fa-bar-chart'
        }
    },
//     {
//         route: 'all-product',
//         name: 'all-product',
//         moduleId: './modules/product-all/index',
//         nav: true,
//         title: 'Produk Keseluruhan',
//         auth: true,
//         settings: {
//             group: "dashboard",
//             permission: { "PJL1": 1 },
//             iconClass: 'fa fa-bar-chart'
//         }
//     },
    {
        route: 'produk-pakaian',
        name: 'produk-pakaian',
        moduleId: './modules/produk-pakaian/index',
        nav: true,
        title: 'Produk Pakaian',
        auth: true,
        settings: {
            group: "dashboard",
            permission: { "PJL1": 1 },
            iconClass: 'fa fa-bar-chart'
        }
    },
//     {
//         route: 'produk-kain',
//         name: 'produk-kain',
//         moduleId: './modules/produk-kain/index',
//         nav: true,
//         title: 'Produk Kain',
//         auth: true,
//         settings: {
//             group: "dashboard",
//             permission: { "PJL1": 1 },
//             iconClass: 'fa fa-bar-chart'
//         }
//     },
//     {
//         route: 'produk-aksesoris',
//         name: 'produk-aksesoris',
//         moduleId: './modules/produk-aksesoris/index',
//         nav: true,
//         title: 'Produk Aksesoris',
//         auth: true,
//         settings: {
//             group: "dashboard",
//             permission: { "PJL1": 1 },
//             iconClass: 'fa fa-bar-chart'
//         }
//     },
//     {
//         route: 'produk-jait',
//         name: 'produk-jait',
//         moduleId: './modules/produk-jait/index',
//         nav: true,
//         title: 'Produk Jasa Jahit',
//         auth: true,
//         settings: {
//             group: "dashboard",
//             permission: { "PJL1": 1 },
//             iconClass: 'fa fa-bar-chart'
//         }
//     }
]
