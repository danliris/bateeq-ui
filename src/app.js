export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      { route: 'storages',      name: 'storages',     moduleId: './storage-crud/index', nav: true, title: 'Storages' },
      { route: 'finishing-masuk',      name: 'finishing-masuk',     moduleId: './transfer-in-cr/index', nav: true, title: 'Finishing-Masuk' },
      { route: 'finishing-keluar',      name: 'finishing-keluar',     moduleId: './transfer-out-cr/index', nav: true, title: 'Finishing-Keluar' }
    ]);

    this.router = router;
  }
}
