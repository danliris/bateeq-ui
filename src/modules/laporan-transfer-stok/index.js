export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'LaporanTransferStok'},
        {route:'view/:storageId/:itemId',          moduleId:'./view',          name:'view',        nav:false,      title:'View:LaporanTransferStok'}
    ]);

    this.router = router;
  }
}