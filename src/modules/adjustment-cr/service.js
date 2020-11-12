import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = 'adjustment/by-user';
const serviceItemUri = 'items/finished-goods';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "inventory");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
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

  getStorage() {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + 'master/storage';
    return super.get(endpoint);
  }

  getByCode(code) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + `items/finished-goods/code-discount/${code}`;
    return super.get(endpoint);
  }

  // getByCode(code) {
  //   var config = Container.instance.get(Config);
  //   var endpoint = config.getEndpoint("master").client.baseUrl + 'items/finished-goods/code/' + code ;
  //   return super.get(endpoint);
  // }

  getDataInventory(args) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + `inventory/stock?source=${args.source}&itemId=${args.itemData}`;
    // return super.list(endpoint, args);
    //var endpoint = `${serviceUri}?itemData=${args.itemData}&source=${args.source}`
    return super.get(endpoint);
  }

}