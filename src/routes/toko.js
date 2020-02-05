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
        title: 'Pemasukan Barang',
        auth: true,
        settings: {
            group: "toko",
            permission: { "SBY.06": 1, "SLO.01": 7, "SLO.02": 7, "SLO.03": 7, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1, "BZR.20" : 1 },
            iconClass: 'fa fa-shopping-bag'
        }
    },
    // {
    //     route: 'efr-tb-bat',
    //     name: 'efr-tb-bat',
    //     moduleId: './modules/efr-tb-bat-cr/index',
    //     nav: true,
    //     title: 'Pemasukan Embalase',
    //     auth: true,
    //     settings: {
    //         group: "toko",
    //         permission: { "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1 },
    //         iconClass: 'fa fa-shopping-bag'
    //     }
    // },
    {
        route: 'efr-kb-rtp',
        name: 'efr-kb-rtp',
        moduleId: './modules/efr-kb-rtp-cr/index',
        nav: true,
        title: 'Retur Barang Ke Pusat',
        auth: true,
        settings: {
            group: "toko",
            permission: { "SBY.06": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1, "BZR.20" : 1 },
            iconClass: 'fa fa-shopping-bag'
        }
    },
    {
        route: 'efr-kb-rtt',
        name: 'efr-kb-rtt',
        moduleId: './modules/efr-kb-rtt-cr/index',
        nav: true,
        title: 'Transfer Stok',
        auth: true,
        settings: {
            group: "toko",
            permission: { "SBY.06": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1, "BZR.20" : 1 },
            iconClass: 'fa fa-shopping-bag'
        }
    },
    {
        route: 'packingList-tt',
        name: 'packingList-tt',
        moduleId: './modules/packing-list-tt/index',
        nav: true,
        title: 'PackingList Transfer Stock',
        auth: true,
        settings: {
            group: "toko",
           // permission: { "GDG.01": 1 },
            permission: { "SBY.06": 1, "SLO.01": 1, "SLO.02": 1, "SLO.03": 1, "ZAL.02": 1, "ZAL.01": 1, "YGY.02": 1, "VIP.01": 1, "TGR.06": 1, "TGR.05": 1, "TGR.04": 1, "TGR.03": 1, "TGR.02": 1, "TGR.01": 1, "TGP.01": 1, "SOG.11": 1, "SOG.10": 1, "SOG.09": 1, "SOG.08": 1, "SOG.07": 1, "SOG.06": 1, "SOG.05": 1, "SOG.04": 1, "SOG.03": 1, "SOG.02": 1, "SOG.01": 1, "SMG.01": 1, "SBY.05": 1, "SBY.03": 1, "SBY.02": 1, "SBY.01": 1, "SBU.01": 1, "ROM.01": 1, "PJU.01": 1, "PBR.01": 1, "PAL.02": 1, "PAL.01": 1, "MTR.09": 1, "MTR.08": 1, "MTR.07": 1, "MTR.06": 1, "MTR.05": 1, "MTR.04": 1, "MTR.03": 1, "MTR.02": 1, "MTR.01": 1, "MTA.01": 1, "MND.01": 1, "MGL.01": 1, "MDN.02": 1, "MDN.01": 1, "MAL.02": 1, "MAL.01": 1, "MAK.02": 1, "MAK.01": 1, "JKT.14": 1, "JKT.13": 1, "JKT.12": 1, "JKT.07": 1, "JKT.06": 1, "JKT.05": 1, "JKT.04": 1, "JKT.03": 1, "JKT.02": 1, "JKT.01": 1, "CTR.01": 1, "CRB.01": 1, "CBR.02": 1, "CBR.01": 1, "BZR.02": 1, "BZR.01": 1, "BTM.01": 1, "BPN.01": 1, "BLI.02": 1, "BLI.01": 1, "BKS.01": 1, "BKA.01": 1, "BGR.01": 1, "BDG.03": 1, "BDG.02": 1, "BDG.01": 1, "BAS.01": 1, "FSL.01": 1, "BZR.20" : 1 },
            iconClass: 'fa fa-bank'
        }
    }]
