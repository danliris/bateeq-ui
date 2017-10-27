module.exports = [
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
    }
]