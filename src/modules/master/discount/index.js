export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list/list', name: 'list', nav: true, title: 'Daftar' },
            { route: 'view/:id', moduleId: './view/view', name: 'view', nav: false, title: 'Detail' },
            { route: 'create', moduleId: './create/create', name: 'create', nav: false, title: 'Buat' }
        ]);

        this.router = router;
    }
}