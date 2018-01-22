export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list/list', name: 'list', nav: true, title: 'List: Purchase Order Internal' },
            { route: 'view/:id', moduleId: './view/view', name: 'view', nav: false, title: 'View: Purchase Order Internal' },
            { route: 'edit/:id', moduleId: './edit/edit', name: 'edit', nav: false, title: 'Edit: Purchase Order Internal' },
            { route: 'create', moduleId: './create/create', name: 'create', nav: false, title: 'Create: Purchase Order Internal' }
        ]);

        this.router = router;
    }
}