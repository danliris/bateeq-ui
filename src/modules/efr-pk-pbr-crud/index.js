export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'SPK Barang Jadi'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:SPK Barang Jadi'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:SPK Barang Jadi'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:SPK Barang Jadi'}
    ]);

    this.router = router;
  }
}