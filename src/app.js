import { Aurelia, inject } from 'aurelia-framework';
import { Session } from './utils/session';

@inject(Session)
export class App {
  constructor(session) {
    this.session = session;
  }

  configureRouter(config, router) {
    config.title = '';
    var routes = [
      { route: ['', 'Welcome'], name: 'welcome', moduleId: './welcome', nav: false, title: 'Home' },


      // { route: 'storages',            name: 'storages',           moduleId: './modules/storage-crud/index',           nav: true, title: 'Storages' ,                                                                settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/brands',     name: 'articles-brands',    moduleId: './modules/article-brand-crud/index',     nav: true, title: 'Brands' ,                                                                  settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/categories', name: 'articles-categories',moduleId: './modules/article-category-crud/index',  nav: true, title: 'Categories' ,                                                              settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/colors',     name: 'articles-colors',    moduleId: './modules/article-color-crud/index',     nav: true, title: 'Colors' ,                                                                  settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/counters',   name: 'articles-counters',  moduleId: './modules/article-counter-crud/index',   nav: true, title: 'Counters' ,                                                                settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/materials',  name: 'articles-materials', moduleId: './modules/article-material-crud/index',  nav: true, title: 'Materials' ,                                                               settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/motifs',     name: 'articles-motifs',    moduleId: './modules/article-motif-crud/index',     nav: true, title: 'Motifs' ,                                                                  settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/origins',    name: 'articles-origins',   moduleId: './modules/article-origin-crud/index',    nav: true, title: 'Origins' ,                                                                 settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/seasons',    name: 'articles-seasons',   moduleId: './modules/article-season-crud/index',    nav: true, title: 'Seasons' ,                                                                 settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/sizes',      name: 'articles-sizes',     moduleId: './modules/article-size-crud/index',      nav: true, title: 'Sizes' ,                                                                   settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/themes',     name: 'articles-themes',    moduleId: './modules/article-theme-crud/index',     nav: true, title: 'Themes' ,                                                                  settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/types',      name: 'articles-types',     moduleId: './modules/article-type-crud/index',      nav: true, title: 'Types' ,                                                                   settings: { group:"master", roles:["admin"] }},
      // { route: 'articles/variants',   name: 'articles-variants',  moduleId: './modules/article-variant-crud/index',   nav: true, title: 'Variants' ,                                                                settings: { group:"master", roles:["admin"] }},
      // { route: 'inventories/module',  name: 'module',             moduleId: './modules/module-crud/index',            nav: true, title: 'Module' ,                                                                  settings: { group:"master", roles:["admin"] }},
     
      // { route: 'transferin',          name: 'transferin',         moduleId: './modules/transfer-in-cr/index',         nav: true, title: 'Transfer In' ,                                                             settings: { group:"inventory", roles:["admin"] }},
      // { route: 'transferout',         name: 'transferout',        moduleId: './modules/transfer-out-cr/index',        nav: true, title: 'Transfer Out' ,                                                            settings: { group:"inventory", roles:["admin"] }},

      // { route: 'efr-tb-act',          name: 'efr-tb-act',         moduleId: './modules/efr-tb-act-cr/index',          nav: true, title: 'Aksesoris - Pemasukan Aksesoris Toko' ,                                    settings: { group:"finishing", roles:["admin"] }},
      // { route: 'efr-tb-sab',          name: 'efr-tb-sab',         moduleId: './modules/efr-tb-sab-cr/index',          nav: true, title: 'Finishing - Pemasukan Komponen Barang Jadi' ,                              settings: { group:"finishing", roles:["admin"] }}, 
      // { route: 'efr-hp-fng',          name: 'efr-hp-fng',         moduleId: './modules/efr-hp-fng-cr/index',          nav: true, title: 'Finishing - Hasil Produksi' ,                                              settings: { group:"finishing", roles:["admin"] }},
      // { route: 'efr-kb-fng',          name: 'efr-kb-fng',         moduleId: './modules/efr-kb-fng-cr/index',          nav: true, title: 'Finishing - Pengeluaran Barang Jadi' ,                                     settings: { group:"finishing", roles:["admin"] }},
      // { route: 'efr-tb-bjr',          name: 'efr-tb-bjr',         moduleId: './modules/efr-tb-bjr-cr/index',          nav: true, title: 'Finishing - Pemasukan Barang Retur Toko' ,                                 settings: { group:"finishing", roles:["admin"] }},
      // { route: 'efr-kb-rtd',          name: 'efr-kb-rtd',         moduleId: './modules/efr-kb-rtd-cr/index',          nav: true, title: 'Finishing - Penyelesaian Barang Retur Toko' ,                              settings: { group:"finishing", roles:["admin"] }},
      // { route: 'efr-kb-alt',          name: 'efr-kb-alt',         moduleId: './modules/efr-kb-alt-cr/index',          nav: true, title: 'Finishing - Pengeluaran Barang Retur Toko ke Sewing (alteration)',         settings: { group:"finishing", roles:["admin"] }},      
      // { route: 'efr-tb-alt',          name: 'efr-tb-alt',         moduleId: './modules/efr-tb-alt-cr/index',          nav: true, title: 'Finishing - Penerimaan Barang Retur Toko dari Sewing (alteration)' ,       settings: { group:"finishing", roles:["admin"] }},
      // { route: 'efr-tb-bjb',          name: 'efr-tb-bjb',         moduleId: './modules/efr-tb-bjb-cr/index',          nav: true, title: 'Pusat Barang Jadi (Baru) - Pemasukan Barang Jadi' ,                        settings: { group:"finished-goods", roles:["admin"] }},
      // { route: 'efr-kb-exb',          name: 'efr-kb-exb',         moduleId: './modules/efr-kb-exb-cr/index',          nav: true, title: 'Pusat Barang Jadi (Baru)/(Retur Toko) - Distribusi Barang ke Ekspedisi' ,  settings: { group:"finished-goods", roles:["admin"] }},
      // { route: 'efr-tb-brt',          name: 'efr-tb-brt',         moduleId: './modules/efr-tb-brt-cr/index',          nav: true, title: 'Pusat Barang Jadi (Retur Toko) - Pemasukan Retur Toko' ,                   settings: { group:"finished-goods", roles:["admin"] }},
      // { route: 'efr-kb-rtf',          name: 'efr-kb-rtf',         moduleId: './modules/efr-kb-rtf-cr/index',          nav: true, title: 'Pusat Barang Jadi (Retur Toko) - Retur ke Finishing' ,                     settings: { group:"finished-goods", roles:["admin"] }},
      // { route: 'efr-tb-brd',          name: 'efr-tb-brd',         moduleId: './modules/efr-tb-brd-cr/index',          nav: true, title: 'Pusat Barang Jadi (Retur Toko) - Pemasukan Retur Toko dari Finishing' ,    settings: { group:"finished-goods", roles:["admin"] }},
      { route: 'efr-tb-bbt', name: 'efr-tb-bbt', moduleId: './modules/efr-tb-bbt-cr/index', nav: true, title: 'Pemasukan Barang Jadi', settings: { group: "Toko", roles: ["admin"] } },
      { route: 'efr-tb-bat', name: 'efr-tb-bat', moduleId: './modules/efr-tb-bat-cr/index', nav: true, title: 'Pemasukan Embalase', settings: { group: "Toko", roles: ["admin"] } },
      { route: 'efr-kb-rtp', name: 'efr-kb-rtp', moduleId: './modules/efr-kb-rtp-cr/index', nav: true, title: 'Retur ke Pusat', settings: { group: "Toko", roles: ["admin"] } },
      // { route: 'efr-kb-rtt',          name: 'efr-kb-rtt',         moduleId: './modules/efr-kb-rtt-cr/index',          nav: true, title: 'Toko - Transfer Stok' ,                                                    settings: { group:"store", roles:["admin"] }},
      // { route: 'efr-pk-pbr',          name: 'efr-pk-pbr',         moduleId: './modules/efr-pk-pbr-crud/index',        nav: true, title: 'Toko Pusat - SPK Barang Jadi (Retur)' ,                                    settings: { group:"store", roles:["admin"] }},

      // { route: 'efr-pk-pbj',          name: 'efr-pk-pbj',         moduleId: './modules/efr-pk-pbj-crud/index',        nav: true, title: 'MD - SPK Barang Jadi (Baru)' ,                                             settings: { group:"merchandiser", roles:["admin"] }},
      // { route: 'efr-pk-pba',          name: 'efr-pk-pba',         moduleId: './modules/efr-pk-pba-crud/index',        nav: true, title: 'MD - SPK Barang Embalase' ,                                                settings: { group:"merchandiser", roles:["admin"] }},

      { route: 'upload-file-pbj', name: 'upload-file-pbj', moduleId: './modules/upload-file-pbj/index', nav: true, title: 'Upload Packing List Barang Jadi ke Toko', settings: { group: "Gudang Pusat", roles: ["admin"] } },
      { route: 'upload-file-pba', name: 'upload-file-pba', moduleId: './modules/upload-file-pba/index', nav: true, title: 'Upload Packing List Embalase ke Toko', settings: { group: "Gudang Pusat", roles: ["admin"] } },
       { route: 'inventories', name: 'inventories', moduleId: './modules/storage-inventory/index', nav: true, title: 'Laporan Stok', settings: { group: "Laporan", roles: ["admin"] } },
      { route: 'power-bi', name: 'power-bi', moduleId: './modules/power-bi/index', nav: true, title: 'Power BI Reports', settings: { group: "Dashboard", roles: ["admin"] } }
    ];

    if (!this.session.isAuthenticated)
      routes = [
        { route: ['', 'login'], name: 'login', moduleId: './modules/login', nav: false, title: 'login' }
      ]
    else {
      routes = routes.filter(route => {
        if (route.settings && route.settings.roles)
          return route.settings.roles.find(role => {
            return this.session.roles.indexOf(role) != -1;
          }) != undefined;
        else
          return true;
      });
    }

    config.map(routes);
    this.router = router;
  }
}

