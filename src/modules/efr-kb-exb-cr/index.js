export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Pusat Barang Baru Kirim Barang Jadi & Aksesoris'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Pusat Barang Baru Kirim Barang Jadi & Aksesoris'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Pusat Barang Baru Kirim Barang Jadi & Aksesoris'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Pusat Barang Baru Kirim Barang Jadi & Aksesoris'}
    ]);

    this.router = router;
  }
}