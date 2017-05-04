export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'target-omset'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:target-omset'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:target-omset'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:target-omset'}
    ]);

    this.router = router;
  }
}