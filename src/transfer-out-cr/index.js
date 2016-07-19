export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Transfer-Out'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Transfer-Out'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Transfer-Out'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Transfer-Out'}
    ]);

    this.router = router;
  }
}