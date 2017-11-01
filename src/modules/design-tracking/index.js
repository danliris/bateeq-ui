export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List' },
            { route: 'board/:id', moduleId: './board', name: 'board', nav: false, title: 'Board' },
            { route: 'design/:id/:stage/:boardId', moduleId: './design', name: 'design', nav: false, title: 'Design' }
        ]);

        this.router = router;
    }
}
