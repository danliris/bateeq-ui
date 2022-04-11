import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUriStorages = 'storages';
const reportUri = 'transfer-stock/monitoring';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "inventory");
  }

  getAllInventory(storageId, keyword) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + 'storages/' + storageId + '/inventories?keyword=' + keyword;
    return super.get(endpoint);
  }

  getAllMovement(storageId, itemId) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + 'storages/' + storageId + "/inventories/" + itemId + "/movements";
    return super.get(endpoint);
  }

  getAllRttByFilter(dateFrom, dateTo, status, code) {
    //var config = Container.instance.get(Config);
    //var endpoint = config.getEndpoint("inventory").client.baseUrl + 'docs/efr-kb-rtt/' + dateFrom + "/" + dateTo + "/" + status;
    var endpoint = `${reportUri}?dateFrom=${dateFrom}&dateTo=${dateTo}&status=${status}&code=${code}`;
    return super.get(endpoint);
  }

  getByCode(code) {
    var endpoint = serviceUriStorages + '?keyword=' + code;
    return super.get(endpoint);
  }

  getSPKByReference(codeRTT) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("merchandiser").client.baseUrl + 'docs/efr-pk/rtt?reference=' + codeRTT;
    return super.get(endpoint);
  }

}