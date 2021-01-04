export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Membership",
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Membership",
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Membership",
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Membership",
      },
    ]);

    this.router = router;
  }
}
