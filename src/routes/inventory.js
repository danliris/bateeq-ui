module.exports = [
    {
        route: 'efr-kb-exp',
        name: 'efr-kb-exp',
        moduleId: './modules/efr-kb-exp-cr/index',
        nav: true,
        title: 'Distribusi Barang ke Ekspedisi',
        auth: true,
        settings: {
            group: "inventory",
            permission: { "GDG1": 7, "GDG2": 7, "GDG4": 7, "GDG3": 7 },
            iconClass: 'fa fa-bank'
        }
    }]