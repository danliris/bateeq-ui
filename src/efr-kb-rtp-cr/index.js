export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Toko Kirim Barang Return'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Toko Kirim Barang Return'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Toko Kirim Barang Return'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Toko Kirim Barang Return'}
    ]);

    this.router = router;
  }
}