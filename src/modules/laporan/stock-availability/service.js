import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUriStock = 'stock-availability';  

export class Service extends RestService{
  
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "inventory");
  }  

  getStorageInInventory(storageId)
  {
    var endpoint = `${serviceUriStock}/${storageId}`; 
    return super.get(endpoint);
  }

  getNearestStockInInventory(inventoryId)
  {
    var endpoint = `${serviceUriStock}/storage/${inventoryId}`;
    return super.get(endpoint);
  }
   
}