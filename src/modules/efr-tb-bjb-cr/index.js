export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Pusat Barang Baru Terima Barang Baru'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Pusat Barang Baru Terima Barang Baru'}, 
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Pusat Barang Baru Terima Barang Baru'}
    ]); 
    this.router = router;
  }
}