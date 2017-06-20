import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUriStorages = 'docs/adjustment';  

export class Service extends RestService{
  
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "inventory");
  }  
  

   getAdjustmentByStorageId(storageId)
  {
    var config = Container.instance.get(Config);
    var endpoint = `${serviceUriStorages}/storage/${storageId}`; 
    return super.get(endpoint);
  }
  // getAllInventory(storageId, keyword)
  // {
  //   var config = Container.instance.get(Config);
  //   var endpoint = config.getEndpoint("inventory").client.baseUrl + 'storages/' + storageId+ '/inventories?keyword=' + keyword; 
  //   return super.get(endpoint);
  // }
  
  // getAllAdjustment(storageId, itemId)
  // {
  //   var config = Container.instance.get(Config);
  //   var endpoint = config.getEndpoint("inventory").client.baseUrl + 'storages/' + storageId+"/inventories/"+itemId+"/movements";  
  //   return super.get(endpoint);
  // }
   
}