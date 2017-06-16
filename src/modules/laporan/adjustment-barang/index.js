export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Storages'},
        // {route:'view/:storageId/:itemId',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Movements'}
    ]);

    this.router = router;
  }
}