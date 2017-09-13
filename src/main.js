// we want font-awesome to load as soon as possible to show the fa-spinner
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/styles.css';
import '../styles/styles.components.css';
import '../styles/styles.login.css';
import '../styles/styles.theme.css';
import '../styles/dashboard.css';
import 'bootstrap';
import authConfig from "../auth-config";

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('au-components')
    .feature('components')
    .feature('converters')
    .plugin("aurelia-api", config => {

      var auth = "https://bateeq-auth-api-dev.mybluemix.net/v1/";
      var core = "https://bateeq-core-api-dev.mybluemix.net/v1/core/";
      var master = "https://bateeq-core-api-dev.mybluemix.net/v1/master/";
      var inventory = "https://bateeq-inventory-api-dev.mybluemix.net/v1/inventory/";
      var merchandiser = "https://bateeq-inventory-api-dev.mybluemix.net/v1/merchandiser/";
      var sales = "https://bateeq-pos-api-dev.mybluemix.net/v1/sales/";


      // var auth = "https://bateeq-auth-api-uat.mybluemix.net/v1/";
      // var core = "https://bateeq-core-api-uat.mybluemix.net/v1/core/";
      // var master = "https://bateeq-core-api-uat.mybluemix.net/v1/master/";
      // var inventory = "https://bateeq-inventory-api-uat.mybluemix.net/v1/inventory/";
      // var merchandiser = "https://bateeq-inventory-api-uat.mybluemix.net/v1/merchandiser/";
      // var sales = "https://bateeq-pos-api-uat.mybluemix.net/v1/sales/";


      config.registerEndpoint('auth', auth);
      config.registerEndpoint('core', core);
      config.registerEndpoint('master', master);
      config.registerEndpoint('inventory', inventory);
      config.registerEndpoint('merchandiser', merchandiser);
      config.registerEndpoint('sales', sales);
    })
    .plugin("aurelia-authentication", baseConfig => {
      baseConfig.configure(authConfig);
    })
    .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 5;
    })
    .developmentLogging();

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  await aurelia.start();
  aurelia.setRoot('app');

  // if you would like your website to work offline (Service Worker), 
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}
