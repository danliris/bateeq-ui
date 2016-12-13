export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', '/list'], moduleId: './list',   name: 'list',   nav: false, title: 'Upload File PBA' },
      { route:'view/:id',     moduleId:'./view',    name:'view',    nav:false,  title:'View:Upload File PBA'},
      { route: 'upload',      moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Upload File PBA' }
    ]);
    this.router = router;
  }
}