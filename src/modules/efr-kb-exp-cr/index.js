export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Pusat Barang Baru/Pusat Retur Toko - Distribusi Barang ke Ekspedisi'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Pusat Barang Baru/Pusat Retur Toko - Distribusi Barang ke Ekspedisi'},
        // {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Pusat Barang Baru/Pusat Retur Toko - Distribusi Barang ke Ekspedisi'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Pusat Barang Baru/Pusat Retur Toko - Distribusi Barang ke Ekspedisi'}
    ]);

    this.router = router;
  }
}