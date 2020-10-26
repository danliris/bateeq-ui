export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ["", "list"], moduleId: "./list", name: "list", nav: false, title: "List: Voucher", },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Voucher' },
      { route: "view/:id", moduleId: "./view", name: "view", nav: false, title: "View: Voucher", },
      { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Voucher' },
    ]);

    this.router = router;
  }
}
