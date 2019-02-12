export class Index {
    configureRouter(config, router) {
      config.map([
          {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'PackingList'},
          {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:PackingList'},
         // {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:PackingList'},
         // {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:PackingList'}
      ]);
  
      this.router = router;
    }
  }