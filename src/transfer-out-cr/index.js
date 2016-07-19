export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Kirim-Aksesoris'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Kirim-Aksesoris'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Kirim-Aksesoris'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Kirim-Aksesoris'}
    ]);

    this.router = router;
  }
}