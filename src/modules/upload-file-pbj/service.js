import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = 'warehousee/upload-pkbj';

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "inventory");
  }

  search(info) {
    var endpoint = 'pkpbj/by-user';
    return super.list(endpoint, info);
  }

  getModuleConfig() {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + 'modules?keyword=EFR-PK/PLB';
    return super.get(endpoint);
  }

  getStorageById(id) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master").client.baseUrl + 'storages/' + id;
    return super.get(endpoint);
  }

  getById(id) {
    var endpoint = `pkpbj/by-user/${id}`;
    return super.get(endpoint);
  }

  //getById(id) {
  //  var endpoint = `${serviceUri}/${id}`;
  //  return super.get(endpoint);
  //}

  getDestinations() {
    var module = 'EFR-PK/PBJ';
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");
    var uri = `master/storages/destination?keyword=${module}`;
    return endpoint.find(uri);
  }

  getSources() {
    var module = 'EFR-PK/PBJ';
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master");
    var uri = `master/storages/source?keyword=${module}`;
    return endpoint.find(uri);
  }


}