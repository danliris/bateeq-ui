export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: './welcome', nav: true, title: 'Welcome' },
      // { route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users' },
      // { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      { route: 'storages', name: 'storages', moduleId: './storage-crud/index', nav: true, title: 'Storages' },
      { route: 'inventories', name: 'inventories', moduleId: './storage-inventory/index', nav: true, title: 'Inventories' },
      { route: 'transferin', name: 'transferin', moduleId: './transfer-in-cr/index', nav: true, title: 'Transfer In' },
      { route: 'transferout', name: 'transferout', moduleId: './transfer-out-cr/index', nav: true, title: 'Transfer Out' },
      { route: 'articles/brands', name: 'articles-brands', moduleId: './article-brand-crud/index', nav: true, title: 'Brands' },
      { route: 'articles/categories', name: 'articles-categories', moduleId: './article-category-crud/index', nav: true, title: 'Categories' },
      { route: 'articles/colors', name: 'articles-colors', moduleId: './article-color-crud/index', nav: true, title: 'Colors' },
      { route: 'articles/counters', name: 'articles-counters', moduleId: './article-counter-crud/index', nav: true, title: 'Counters' },
      { route: 'articles/materials', name: 'articles-materials', moduleId: './article-material-crud/index', nav: true, title: 'Materials' },
      { route: 'articles/motifs', name: 'articles-motifs', moduleId: './article-motif-crud/index', nav: true, title: 'Motifs' },
      { route: 'articles/origins', name: 'articles-origins', moduleId: './article-origin-crud/index', nav: true, title: 'Origins' },
      { route: 'articles/seasons', name: 'articles-seasons', moduleId: './article-season-crud/index', nav: true, title: 'Seasons' },
      { route: 'articles/sizes', name: 'articles-sizes', moduleId: './article-size-crud/index', nav: true, title: 'Sizes' },
      { route: 'articles/themes', name: 'articles-themes', moduleId: './article-theme-crud/index', nav: true, title: 'Themes' },
      { route: 'articles/types', name: 'articles-types', moduleId: './article-type-crud/index', nav: true, title: 'Types' },
      { route: 'articles/variants', name: 'articles-variants', moduleId: './article-variant-crud/index', nav: true, title: 'Variants' },
      { route: 'inventories/module', name: 'module', moduleId: './module-crud/index', nav: true, title: 'Module' },

      { route: 'efr-tb-bcd', name: 'efr-tb-bcd', moduleId: './efr-tb-bcd-cr/index', nav: true, title: 'Finishing Terima Barcode' },
      { route: 'efr-kb-rtt', name: 'efr-kb-rtt', moduleId: './efr-kb-rtt-cr/index', nav: true, title: 'Toko Transfer Stok' },
      { route: 'efr-tb-swg', name: 'efr-tb-swg', moduleId: './efr-tb-swg-cr/index', nav: true, title: 'Finishing Terima Barang Setengah Jadi' },
      { route: 'efr-kb-rtp', name: 'efr-kb-rtp', moduleId: './efr-kb-rtp-cr/index', nav: true, title: 'Toko Kirim Barang Return' },
      { route: 'efr-tb-acc', name: 'efr-tb-acc', moduleId: './efr-tb-acc-cr/index', nav: true, title: 'Finishing Terima Aksesoris' },
      { route: 'efr-kb-rtf', name: 'efr-kb-rtf', moduleId: './efr-kb-rtf-cr/index', nav: true, title: 'Pusat Retur Toko Kirim Barang Retur' },
      { route: 'efr-tb-bjb', name: 'efr-tb-bjb', moduleId: './efr-tb-bjb-cr/index', nav: true, title: 'Pusat Barang Baru Terima Barang Baru' },
      { route: 'efr-kb-fng', name: 'efr-kb-fng', moduleId: './efr-kb-fng-cr/index', nav: true, title: 'Finishing Kirim Barang Baru' },
    
      { route: 'efr-kb-exb', name: 'efr-kb-exb', moduleId: './efr-kb-exb-cr/index', nav: true, title: 'Pusat Barang Baru - Kirim Barang Jadi & Aksesoris' },
      { route: 'efr-kb-exr', name: 'efr-kb-exr', moduleId: './efr-kb-exr-cr/index', nav: true, title: 'Pusat Retur Toko - Kirim Barang Retur (selesai perbaikan)' },
      { route: 'efr-kb-rtd', name: 'efr-kb-rtd', moduleId: './efr-kb-rtd-cr/index', nav: true, title: 'Finishing - Kirim Barang Retur (selesai perbaikan)' },
      { route: 'efr-tb-bat', name: 'efr-tb-bat', moduleId: './efr-tb-bat-cr/index', nav: true, title: 'Toko - Terima Aksesoris' },
      { route: 'efr-tb-bbt', name: 'efr-tb-bbt', moduleId: './efr-tb-bbt-cr/index', nav: true, title: 'Toko - Terima Barang Jadi' },
      { route: 'efr-tb-bjr', name: 'efr-tb-bjr', moduleId: './efr-tb-bjr-cr/index', nav: true, title: 'Finishing - Terima Barang Jadi (Retur)' },
      { route: 'efr-tb-brd', name: 'efr-tb-brd', moduleId: './efr-tb-brd-cr/index', nav: true, title: 'Pusat Retur Toko - Terima Barang Retur (selesai perbaikan)' },
      { route: 'efr-tb-brt', name: 'efr-tb-brt', moduleId: './efr-tb-brt-cr/index', nav: true, title: 'Pusat Retur Toko - Terima Barang Jadi Retur' },

      { route: 'erp-pk-bj', name: 'erp-pk-bj', moduleId: './erp-pk-bj-crud/index', nav: true, title: 'SPK Barang Jadi' }

    ]);

    this.router = router;
  }
}
