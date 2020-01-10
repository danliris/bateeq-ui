import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUriStorages = '/storages';  

export class Service extends RestService{
  
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "master");
  }  
  
  getAllInventory(storageId, keyword)
  {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + 'storages/' + storageId+ '/inventories?keyword=' + keyword; 
    return super.get(endpoint);
  }
  
  generateExcel(storageId, keyword) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + 'storages/' + storageId+ '/inventories?keyword=' + keyword; 
    return super.getXls(endpoint);
}
  
  getAllMovement(storageId, itemId, info)
  {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + 'storages/' + storageId+"/inventories/"+itemId+"/movements";  
    return super.list(endpoint, info);
  }

  movementExcel(storageId, itemId) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + 'storages/' + storageId+"/inventories/"+itemId+"/movements";  
    return super.getXls(endpoint);
}
   
}