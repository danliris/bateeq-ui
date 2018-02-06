export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list/list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view/view', name: 'view', nav: false, title: 'View:Supplier' },
            { route: 'edit/:id', moduleId: './edit/edit', name: 'edit', nav: false, title: 'Edit:Supplier' },
            { route: 'create', moduleId: './create/create', name: 'create', nav: false, title: 'Create:Supplier' },
            { route: 'upload', moduleId: './upload/upload', name: 'upload', nav: false, title: 'Upload:Supplier' }
        ]);

        this.router = router;
    }
}