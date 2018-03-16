export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list/list', name: 'list', nav: false, title: 'List: Surat Perintah Bayar' },
            { route: 'create', moduleId: './create/create', name: 'create', nav: false, title: 'Create: Surat Perintah Bayar' },
            { route: 'view/:id', moduleId: './view/view', name: 'view', nav: false, title: 'View:  Surat Perintah Bayar' },
            { route: 'edit/:id', moduleId: './edit/edit', name: 'edit', nav: false, title: 'Edit: Surat Perintah Bayar' },
        ]);

        this.router = router;
    }
}