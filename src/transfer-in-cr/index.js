export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Terima-Aksesoris'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Terima-Aksesoris'}, 
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Terima-Aksesoris'}
    ]); 
    this.router = router;
  }
}