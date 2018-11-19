export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "/list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "Daftar"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Buat | BLocking Plan Sewing"
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "Detail"
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Ubah"
      },
      {
        route: "confirm/:id",
        moduleId: "./confirm",
        name: "confirm",
        nav: false,
        title: "Confirm: Booking"
      }
    ]);
    this.router = router;
  }
}
