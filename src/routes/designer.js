module.exports = [
    {
        route: 'design-tracking-reason',
        name: 'design-tracking-reason',
        moduleId: './modules/design-tracking-reason/index',
        nav: true,
        title: 'Alasan Design Tracking',
        auth: true,
        settings: {
            group: "designer",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'design-tracking',
        name: 'design-tracking',
        moduleId: './modules/design-tracking/index',
        nav: true,
        title: 'Design Tracking',
        auth: true,
        settings: {
            group: "designer",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'category',
        name: 'category',
        moduleId: './modules/merchandiser/category/index',
        nav: true,
        title: 'Kategori',
        auth: true,
        settings: {
            group: "designer",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    },
    {
        route: 'material',
        name: 'material',
        moduleId: './modules/merchandiser/material/index',
        nav: true,
        title: 'Bahan',
        auth: true,
        settings: {
            group: "designer",
            permission: { "MRD.01": 1 },
            iconClass: 'fa fa-adjust'
        }
    }
]