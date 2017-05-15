export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Kirim Barang Ke Unit'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Kirim Barang Ke Unit'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Kirim Barang Ke Unit'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Kirim Barang Ke Unit'}
    ]);

    this.router = router;
  }
}