export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Stock Opname' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Stock Opname' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Stock Opname' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Stock Opname' },
        ]);

        this.router = router;
    }
}