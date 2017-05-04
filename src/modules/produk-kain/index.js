export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'produk-kain'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:produk-kain'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:produk-kain'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:produk-kain'}
    ]);

    this.router = router;
  }
}