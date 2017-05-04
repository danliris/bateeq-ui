export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'produk-aksesoris'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:produk-aksesoris'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:produk-aksesoris'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:produk-aksesoris'}
    ]);

    this.router = router;
  }
}