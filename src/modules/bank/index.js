export class Index {
    configureRouter(config, router) {
        config.map([
            {route: ['', '/list'], moduleId: './list', name: 'list', nav: false, title: 'Daftar Bank'},
            {route:'create', moduleId:'./create', name:'create', nav:false, title:'Create: Data Bank'},
            {route:'view/:id', moduleId:'./view', name:'view', nav:false, title:'View: Data Bank'},
            {route:'edit/:id', moduleId:'./edit', name:'edit', nav:false, title:'Update: Data Bank'}
        ]);
        this.router = router;
    }
}