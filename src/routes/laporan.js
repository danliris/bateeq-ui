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
            permission: { "SBY.06": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "GDG1": 1, "GDG2": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
            iconClass: 'fa fa-table'
        }
    },
    {
        route: 'inventories-product',
        name: 'inventories-product',
        moduleId: './modules/storage-inventory-product/index',
        nav: true,
        title: 'Cari Produk',
        auth: true,
        settings: {
            group: "laporan",
            permission: { "SBY.06": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "GDG1": 1, "GDG2": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
            iconClass: 'fa fa-table'
        }
    },
    {
        route: 'age-inventories',
        name: 'age-inventories',
        moduleId: './modules/age-inventory/index',
        nav: true,
        title: 'Laporan Umur Barang',
        auth: true,
        settings: {
            group: "laporan",
            permission: { "SBY.06": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "GDG1": 1, "GDG2": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
            iconClass: 'fa fa-table'
        }
    },
    {
        route: 'laporanAdjustmentBarang',
        name: 'laporanAdjustmentBarang',
        moduleId: './modules/laporan/adjustment-barang/index',
        nav: true,
        title: 'Laporan Adjustment Barang',
        auth: true,
        settings: {
            group: "laporan",
            permission: { "SBY.06": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1, "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1 },
            iconClass: 'fa fa-table'
        }
    },
    {
        route: 'stock-availability',
        name: 'stock-availability',
        moduleId: './modules/laporan/stock-availability/index',
        nav: true,
        title: 'Laporan Ketersediaan Stok',
        auth: true,
        settings: {
            group: "laporan",
            permission: { "SBY.06": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1, "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1 },
            iconClass: 'fa fa-table'
        }
    },
    {
        route: 'distribusi-barang',
        name: 'distribusi-barang',
        moduleId: './modules/laporan/distribusi-barang/index',
        nav: true,
        title: 'Laporan Distribusi Barang',
        auth: true,
        settings: {
            group: "laporan",
            permission: { "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1 },
            iconClass: 'fa fa-table'
        }
    },
    {
        route: 'packing-list',
        name: 'packing-list',
        moduleId: './modules/laporan/packing-list/index',
        nav: true,
        title: 'Laporan Packing List',
        auth: true,
        settings: {
            group: "laporan",
            permission: { "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1 },
            iconClass: 'fa fa-table'
        }
    },
    {
        route: 'laporan-transfer-stok',
        name: 'laporan-transfer-stok',
        moduleId: './modules/laporan-transfer-stok/index',
        nav: true,
        title: 'Laporan Transfer Stok',
        auth: true,
        settings: {
            group: "laporan",
            permission: { "SBY.06": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 ,"GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1, "FNC.01": 1, "ACC.01": 1 },
            iconClass: 'fa fa-table'
        }
    },
    {
        route: 'laporan-stok-akhir-bulan',
        name: 'laporan-stok-akhir-bulan',
        moduleId: './modules/laporan-stok-akhir-bulan/index',
        nav: true,
        title: 'Laporan Stok Akhir Bulan',
        auth: true,
        settings: {
            group: "laporan",
            permission: { "SBY.06": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 ,"GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1, "FNC.01": 1, "ACC.01": 1 },
            iconClass: 'fa fa-table'
        }
    }
    ,
    {
        route: 'laporan-stok-per-ro',
        name: 'laporan-stok-per-ro',
        moduleId: './modules/laporan/laporan-stok-ro/index',
        nav: true,
        title: 'Laporan Stok Per RO',
        auth: true,
        settings: {
            group: "laporan",
            permission: { "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1, "GDG.01": 1, "GDG.02": 1, "GDG.03": 1, "GDG.04": 1, "GDG.05": 1, "FNC.01": 1, "ACC.01": 1 },
            iconClass: 'fa fa-table'
        }
    }
]