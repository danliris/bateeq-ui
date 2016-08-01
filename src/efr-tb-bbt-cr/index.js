export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Toko Terima Barang Jadi'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Toko Terima Barang Jadi'}, 
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Toko Terima Barang Jadi'}
    ]); 
    this.router = router;
  }
}