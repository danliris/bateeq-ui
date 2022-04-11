import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

//const serviceUri = 'docs/efr-kb-rtu';
const serviceUri = 'transfer-out';
const serviceSearch = 'docs/efr-pk-pbj/submitted';
const servicePrintUri = 'docs/print/efr-kb-rtu';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "inventory");
  }

  search(info) {
    var endpoint = `${serviceUri}/retur`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  generateExcel(id) {
    var endpoint = `${serviceUri}/${id}/exportall`;
    return super.getXls(endpoint);
  }

  getSPKByPackingList(packingList) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("merchandiser").client.baseUrl + 'docs/efr-pk/received?keyword=' + packingList;
    return super.get(endpoint);
  }

  getSPKByReference(reference) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + 'pkpbj/by-user/byreference?reference=' + reference;
    return super.get(endpoint);
  }

  getModuleConfig() {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + 'modules?keyword=EFR-KB/RTP';
    return super.get(endpoint);
  }

  getStorageById(id) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + 'storages/' + id;
    return super.get(endpoint);
  }

  getDataInventory(storageId, itemId) {
    var endpoint = 'storages/' + storageId + '/inventories/' + itemId;
    return super.get(endpoint);
  }

  getByCode(code) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + 'items/finished-goods/code/' + code;
    return super.get(endpoint);
  }

  getExpeditionServices() {
    return new Promise((resolve, reject) => {
      var config = Container.instance.get(Config);
      var endpoint = config.getEndpoint("master").client.baseUrl + 'expedition-service-routers/all';
      super.get(endpoint).then(result => resolve(result));
    });
  }

  getSource(name) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + 'storages?keyword=' + name;
    return super.get(endpoint);
  }
  getDestinations() {
    var module = 'EFR-KB/RTU';
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");
    var uri = `master/storages/destination?keyword=${module}`;
    return endpoint.find(uri);
  }

  getSources() {
    var module = 'EFR-KB/RTU';
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master");
    var uri = `master/storages/source?keyword=${module}`;
    return endpoint.find(uri);
  }

  getByCode(args) {
    console.log(args);
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + `inventory/code?itemData=${args.itemData}&source=${args.source}`;
    // return super.list(endpoint, args);
    //var endpoint = `${serviceUri}?itemData=${args.itemData}&source=${args.source}`
    return super.get(endpoint);

  }

  getByName(args) {
    // console.log(args);
    var config = Container.instance.get(Config);
    var query = `inventory/name?itemData=${args.itemData}&source=${args.source}`
    var endpoint = config.getEndpoint("inventory").client.baseUrl + query
// console.log(endpoint);
    return super.get(endpoint);
  }
  getPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }
}
