export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', '/list'], moduleId: './list',   name: 'list',   nav: false, title: 'Upload File PBJ' },
      { route:'view/:id',     moduleId:'./view',    name:'view',    nav:false,  title:'View:Upload File PBJ'},
      { route: 'upload',      moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Upload File PBJ' }
    ]);
    this.router = router;
  }
}