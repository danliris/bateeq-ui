import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'docs/efr-pk-pbj';
const servicePrintUri = 'docs/print/efr-pk-pbj';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "merchandiser");
  }

  search(info) {
    var endpoint = `${serviceUri}/NotReceived`;
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

  createDraft(data) {
    var endpoint = `${serviceUri}/drafted`;
    return super.post(endpoint, data);
  }

  getModuleConfig() {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + 'modules?keyword=EFR-PK/PLB';
    return super.get(endpoint);
  }

  getStorageById(id) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + '/storages/' + id;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data._id}`;
    return super.put(endpoint, data);
  }

  updateDraft(data) {
    var endpoint = `${serviceUri}/draft/${data._id}`;
    return super.put(endpoint, data);
  }

  getByCode(code) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + 'items/finished-goods/code/' + code;
    return super.get(endpoint);
  }

  delete(data) {
    var endpoint = `${serviceUri}/draft/${data._id}`;
    return super.delete(endpoint, data);
  }

  getDataInventory(storageId, itemId) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + 'storages/' + storageId + '/inventories/' + itemId;
    return super.get(endpoint);
  }

  getPdfById(id) {
    var endpoint = `${servicePrintUri}/${id}`;
    return super.getPdf(endpoint);
  }

  getSource(name) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + 'storages?keyword=' + name;
    return super.get(endpoint);
  }

}
