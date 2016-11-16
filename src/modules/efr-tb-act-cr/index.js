export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Finishing Terima Aksesoris'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Finishing Terima Aksesoris'}, 
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Finishing Terima Aksesoris'}
    ]); 
    this.router = router;
  }
}