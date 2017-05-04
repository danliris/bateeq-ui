export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Keuangan'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Keuangan'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Keuangan'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Keuangan'}
    ]);

    this.router = router;
  }
}