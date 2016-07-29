export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Barang Jadi Pusat Terima Barang Jadi'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Barang Jadi Pusat Terima Barang Jadi'}, 
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Barang Jadi Pusat Terima Barang Jadi'}
    ]); 
    this.router = router;
  }
}