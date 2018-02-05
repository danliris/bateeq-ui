export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list/list', name: 'list', nav: true, title: 'List: Products' },
            { route: 'view/:id', moduleId: './view/view', name: 'view', nav: false, title: 'View: Product' },
            { route: 'edit/:id', moduleId: './edit/edit', name: 'edit', nav: false, title: 'Edit: Product' },
            { route: 'create', moduleId: './create/create', name: 'create', nav: false, title: 'Create: Product' },
            { route: 'upload', moduleId: './upload/upload', name: 'upload', nav: false, title: 'Upload: Product' }
        ]);
    }
}