export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'produk-jait'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:produk-jait'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:produk-jait'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:produk-jait'}
    ]);

    this.router = router;
  }
}