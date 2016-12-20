export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Finishing Terima Barang Jadi Retur'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Finishing Terima Barang Jadi Retur'}, 
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Finishing Terima Barang Jadi Retur'}
    ]); 
    this.router = router;
  }
}