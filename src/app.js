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

      { route: 'efr-tb-act', name: 'efr-tb-act', moduleId: './efr-tb-act-cr/index', nav: true, title: 'Aksesoris - Pemasukan Aksesoris Toko' },
      { route: 'efr-tb-sab', name: 'efr-tb-sab', moduleId: './efr-tb-sab-cr/index', nav: true, title: 'Finishing - Pemasukan Komponen Barang Jadi' }, 
      { route: 'efr-hp-fng', name: 'efr-hp-fng', moduleId: './efr-hp-fng-cr/index', nav: true, title: 'Finishing - Hasil Produksi' },
      { route: 'efr-kb-fng', name: 'efr-kb-fng', moduleId: './efr-kb-fng-cr/index', nav: true, title: 'Finishing - Pengeluaran Barang Jadi' },
      { route: 'efr-tb-bjr', name: 'efr-tb-bjr', moduleId: './efr-tb-bjr-cr/index', nav: true, title: 'Finishing - Pemasukan Barang Retur Toko' },
      { route: 'efr-kb-rtd', name: 'efr-kb-rtd', moduleId: './efr-kb-rtd-cr/index', nav: true, title: 'Finishing - Penyelesaian Barang Retur Toko' },
      { route: 'efr-kb-alt', name: 'efr-kb-alt', moduleId: './efr-kb-alt-cr/index', nav: true, title: 'Finishing - Pengeluaran Barang Retur Toko ke Sewing (alteration)'},      
      { route: 'efr-tb-alt', name: 'efr-tb-alt', moduleId: './efr-tb-alt-cr/index', nav: true, title: 'Finishing - Penerimaan Barang Retur Toko dari Sewing (alteration)' },
      { route: 'efr-tb-bjb', name: 'efr-tb-bjb', moduleId: './efr-tb-bjb-cr/index', nav: true, title: 'Pusat Barang Jadi (Baru) - Pemasukan Barang Jadi' },
      { route: 'efr-kb-exb', name: 'efr-kb-exb', moduleId: './efr-kb-exb-cr/index', nav: true, title: 'Pusat Barang Jadi (Baru)/(Retur Toko) - Distribusi Barang ke Ekspedisi' },
      { route: 'efr-tb-bbt', name: 'efr-tb-bbt', moduleId: './efr-tb-bbt-cr/index', nav: true, title: 'Toko - Pemasukan Barang Jadi' },
      { route: 'efr-tb-bat', name: 'efr-tb-bat', moduleId: './efr-tb-bat-cr/index', nav: true, title: 'Toko - Pemasukan Embalase' },
      { route: 'efr-kb-rtp', name: 'efr-kb-rtp', moduleId: './efr-kb-rtp-cr/index', nav: true, title: 'Toko - Retur Barang Jadi (Baru)' },
      { route: 'efr-kb-rtt', name: 'efr-kb-rtt', moduleId: './efr-kb-rtt-cr/index', nav: true, title: 'Toko - Transfer Stok' },
      { route: 'efr-tb-brt', name: 'efr-tb-brt', moduleId: './efr-tb-brt-cr/index', nav: true, title: 'Pusat Barang Jadi (Retur Toko) - Pemasukan Retur Toko' },
      { route: 'efr-kb-rtf', name: 'efr-kb-rtf', moduleId: './efr-kb-rtf-cr/index', nav: true, title: 'Pusat Barang Jadi (Retur Toko) - Retur ke Finishing' },
      { route: 'efr-tb-brd', name: 'efr-tb-brd', moduleId: './efr-tb-brd-cr/index', nav: true, title: 'Pusat Barang Jadi (Retur Toko) - Pemasukan Retur Toko dari Finishing' },
      
      { route: 'efr-pk-pbj', name: 'efr-pk-pbj', moduleId: './efr-pk-pbj-crud/index', nav: true, title: 'MD - SPK Barang Jadi (Baru)' },
      { route: 'efr-pk-pba', name: 'efr-pk-pba', moduleId: './efr-pk-pba-crud/index', nav: true, title: 'MD - SPK Barang Embalase' },
      { route: 'efr-pk-pbr', name: 'efr-pk-pbr', moduleId: './efr-pk-pbr-crud/index', nav: true, title: 'Toko Pusat - SPK Barang Jadi (Retur)' },
      { route: 'sales', name: 'sales', moduleId: './sales-cr/index', nav: true, title: 'sales' },
      { route: 'report-sales-payment', name: 'report-sales-payment', moduleId: './report-sales-payment/index', nav: true, title: 'report sales payment' }
    ]);

    this.router = router;
  }
}
