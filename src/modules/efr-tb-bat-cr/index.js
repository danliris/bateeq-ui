export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Toko Terima Aksesoris'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Toko Terima Aksesoris'}, 
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Toko Terima Aksesoris'},
        {route:'list/pending',      moduleId:'./list-pending',  name:'list-pending',nav:false,      title:'Pending:Toko Terima Barang Jadi'}
]); 
    this.router = router;
  }
}