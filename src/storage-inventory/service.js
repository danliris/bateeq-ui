import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../rest-service';
  
const serviceUriStorages = 'http://bateeq-inventory-api.au-syd.mybluemix.net/v1/inventories/storages';
const serviceUriInventories = 'http://bateeq-inventory-api.au-syd.mybluemix.net/v1/inventories/storages/{storageId}/inventories';
const serviceUriMovements = 'http://bateeq-inventory-api.au-syd.mybluemix.net/v1/inventories/storages/{storageId}/inventories/{articleVariantId}/movements';

export class Service extends RestService{
  
  constructor(http, aggregator) {
    super(http, aggregator);
  } 

  getAllStorage()
  {
    var endpoint = `${serviceUriStorages}`;
    return super.get(endpoint);
  } 
   
  getAllInvetory(storageId)
  {
    var endpoint = `${serviceUriInventories.replace("{storageId}", storageId)}`;
    return super.get(endpoint);
  }
  
  getAllMovement(storageId, articleVariantId)
  {
    var endpoint = `${serviceUriMovements.replace("{storageId}", storageId).replace("{articleVariantId}", articleVariantId)}`;
    return super.get(endpoint);
  }
   
}
