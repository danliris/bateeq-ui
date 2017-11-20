export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Account' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Account' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Account' },
            { route: 'change-password/:id', moduleId: './change-password', name: 'changePassword', nav: false, title: 'Change:Password' }
        ]);

        this.router = router;
    }
}
