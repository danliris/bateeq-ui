export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './welcome',      nav: true, title: 'Welcome' },
      // { route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users' },
      // { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      { route: 'storages',      name: 'storages',     moduleId: './storage-crud/index', nav: true, title: 'Storages' },
      { route: 'finishing-masuk',      name: 'finishing-masuk',     moduleId: './transfer-in-cr/index', nav: true, title: 'Finishing-Masuk' },
      { route: 'finishing-keluar',      name: 'finishing-keluar',     moduleId: './transfer-out-cr/index', nav: true, title: 'Finishing-Keluar' },
      { route: 'articles/brands',      name: 'articles-brands',     moduleId: './article-brand-crud/index', nav: true, title: 'Brands' },
      { route: 'articles/categories',      name: 'articles-categories',     moduleId: './article-category-crud/index', nav: true, title: 'Categories' },
      { route: 'articles/colors',      name: 'articles-colors',     moduleId: './article-color-crud/index', nav: true, title: 'Colors' },
      { route: 'articles/counters',      name: 'articles-counters',     moduleId: './article-counter-crud/index', nav: true, title: 'Counters' },
      { route: 'articles/materials',      name: 'articles-materials',     moduleId: './article-material-crud/index', nav: true, title: 'Materials' },
      { route: 'articles/motifs',      name: 'articles-motifs',     moduleId: './article-motif-crud/index', nav: true, title: 'Motifs' },
      { route: 'articles/origins',      name: 'articles-origins',     moduleId: './article-origin-crud/index', nav: true, title: 'Origins' },
      { route: 'articles/seasons',      name: 'articles-seasons',     moduleId: './article-season-crud/index', nav: true, title: 'Seasons' },
      { route: 'articles/sizes',      name: 'articles-sizes',     moduleId: './article-size-crud/index', nav: true, title: 'Sizes' },
      { route: 'articles/themes',      name: 'articles-themes',     moduleId: './article-theme-crud/index', nav: true, title: 'Themes' },
      { route: 'articles/types',      name: 'articles-types',     moduleId: './article-type-crud/index', nav: true, title: 'Types' },
      { route: 'articles/variants',      name: 'articles-variants',     moduleId: './article-variant-crud/index', nav: true, title: 'Variants' }
    ]);

    this.router = router;
  }
}
