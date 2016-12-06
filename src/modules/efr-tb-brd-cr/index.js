export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Pusat Retur Toko Terima Barang Retur (selesai perbaikan)'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Pusat Retur Toko Terima Barang Retur (selesai perbaikan)'}, 
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Pusat Retur Toko Terima Barang Retur (selesai perbaikan)'}
    ]); 
    this.router = router;
  }
}