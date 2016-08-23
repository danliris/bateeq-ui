import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../rest-service';
  
const serviceUriStorages = require('../host').inventory + '/storages';
const serviceUriInventories = require('../host').inventory + '/storages/{storageId}/inventories';
const serviceUriMovements = require('../host').inventory + '/storages/{storageId}/inventories/{articleVariantId}/movements';

export class Service extends RestService{
  
  constructor(http, aggregator) {
    super(http, aggregator);
  } 

  getAllStorage()
  {
    var endpoint = `${serviceUriStorages}`;
    return super.get(endpoint);
  } 
   
  getAllInventory(storageId, keyword)
  {
    var endpoint = `${serviceUriInventories.replace("{storageId}", storageId)}` + "?keyword=" + keyword;
    return super.get(endpoint);
  }
  
  getAllMovement(storageId, articleVariantId)
  {
    var endpoint = `${serviceUriMovements.replace("{storageId}", storageId).replace("{articleVariantId}", articleVariantId)}`;
    return super.get(endpoint);
  }
   
}
