export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Penjualan'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Penjualan'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Penjualan'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Penjualan'}
    ]);

    this.router = router;
  }
}