export class Index {
    configureRouter(config, router) {
        config.map([
            {route: ['', '/list'], moduleId: './list', name: 'list', nav: false, title: 'Daftar Range Diskon Produk'},
            {route:'create', moduleId:'./create', name:'create', nav:false, title:'Create: Data Range Diskon Produk'},
            {route:'view/:id', moduleId:'./view', name:'view', nav:false, title:'View: Data Range Diskon Produk'},
            {route:'edit/:id', moduleId:'./edit', name:'edit', nav:false, title:'Update: Data Range Diskon Produk'}
        ]);
        this.router = router;
    }
}