export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "Setting: Reward Point",
      }
    ]);

    this.router = router;
  }
}
