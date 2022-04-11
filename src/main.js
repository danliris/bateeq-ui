// we want font-awesome to load as soon as possible to show the fa-spinner
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/styles.css";
import "../styles/styles.components.css";
import "../styles/styles.login.css";
import "../styles/styles.theme.css";
import "../styles/dashboard.css";
import "bootstrap";
import authConfig from "../auth-config";
import "whatwg-fetch";

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from "bluebird";
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature("au-components")
    .feature("components")
    .feature("converters")
    .plugin("aurelia-api", config => {
      var offset = new Date().getTimezoneOffset() / 60 * -1;
      var defaultConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-timezone-offset': offset
        }
      }

      var auth = "https://bateeq-auth-api.azurewebsites.net/v1/";
      var core = "https://bateeq-core-api.azurewebsites.net/v1/core/";
      var ncore ="https://com-bateeq-service-core.azurewebsites.net/v1/";
      var master = "https://bateeq-core-api.azurewebsites.net/v1/master/";
      var manufacture ="https://bateeq-core-api.azurewebsites.net/v1/manufacture/";
      var inventory ="https://bateeq-inventory-api.azurewebsites.net/v1/inventory/";
      var inventoryAzure = "https://com-bateeq-service-inventory.azurewebsites.net/v1/"
      var merchandiser ="https://bateeq-inventory-api.azurewebsites.net/v1/merchandiser/";
      var md ="https://com-bateeq-service-merchandiser.azurewebsites.net/v1/";
      var sales = "https://bateeq-pos-api.azurewebsites.net/v1/sales/";
      var purchasing ="https://bateeq-inventory-api.azurewebsites.net/v1/purchasing/";
      var purchasingAzure = "https://com-bateeq-service-purchasing.azurewebsites.net/v1/";
      var finance = "https://com-bateeq-service-finance-accounting.azurewebsites.net/v1/";
      var nmasterplan ="https://com-bateeq-service-sales.azurewebsites.net/v1/";
      var customers = "https://com-bateeqshop-service-auth.azurewebsites.net/v1/";
      var rewardPoints = "https://com-bateeqshop-service-voucher.azurewebsites.net/v1/api/";
      var productBateeqshop= "https://com-bateeqshop-service-product.azurewebsites.net/v1/";
      var voucher= "https://com-bateeqshop-service-voucher.azurewebsites.net/v1/";
      var generalSetting = "https://com-bateeqshop-service-general.azurewebsites.net/v1/generalSetting/";
      var authBateeqshop = "https://com-bateeqshop-service-auth.azurewebsites.net/v1/";

      //Config API
      config.registerEndpoint("auth", auth);
      config.registerEndpoint("core", core);
      config.registerEndpoint("ncore", ncore);
      config.registerEndpoint("master", master);
      config.registerEndpoint("manufacture", manufacture);
      config.registerEndpoint("inventory", inventory);
      config.registerEndpoint("inventory-azure", inventoryAzure);
      config.registerEndpoint("merchandiser", merchandiser);
      config.registerEndpoint("md", md);
      config.registerEndpoint("sales", sales);
      config.registerEndpoint("purchasing", purchasing);
      config.registerEndpoint("purchasing-azure", purchasingAzure, defaultConfig);
      config.registerEndpoint('finance', finance, defaultConfig);
      //config.registerEndpoint("masterplan", masterplan);
      config.registerEndpoint("nmasterplan", nmasterplan);
      config.registerEndpoint("customers", customers);
      config.registerEndpoint("rewardPoints", rewardPoints);
      config.registerEndpoint("voucher",voucher);
      config.registerEndpoint("productBateeqshop",productBateeqshop);
      config.registerEndpoint("generalSetting",generalSetting);
      config.registerEndpoint("authBateeqshop",authBateeqshop);
    })
    .plugin("aurelia-authentication", baseConfig => {
      baseConfig.configure(authConfig);
    })
    .plugin("aurelia-dialog", config => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 5;
    })
    .plugin("aurelia-dragula")
    .plugin('aurelia-bootstrap')
    .developmentLogging();

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  await aurelia.start();
  aurelia.setRoot("app");

  // if you would like your website to work offline (Service Worker),
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}
