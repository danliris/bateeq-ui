export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Module'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Module'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Module'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Module'}
    ]);

    this.router = router;
  }
}