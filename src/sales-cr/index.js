export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Pembayaran'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Pembayaran'}, 
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Pembayaran'}
    ]); 
    this.router = router;
  }
}