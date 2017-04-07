export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Toko Transfer Stok ke Toko Lain'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Toko Transfer Stok ke Toko Lain'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Toko Transfer Stok ke Toko Lain'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Toko Transfer Stok ke Toko Lain'}
    ]);

    this.router = router;
  }
}