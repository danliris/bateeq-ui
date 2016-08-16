export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Finishing Kirim Barang Alteration'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Finishing Kirim Barang Alteration'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Finishing Kirim Barang Alteration'}
    ]);

    this.router = router;
  }
}