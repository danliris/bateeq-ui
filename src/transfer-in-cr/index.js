export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Transfer-In'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Transfer-In'}, 
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Transfer-In'}
    ]); 
    this.router = router;
  }
}