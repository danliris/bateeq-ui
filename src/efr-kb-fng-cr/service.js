import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../rest-service';
 
const serviceUri = require('../host').inventory + '/docs/efr-kb-fng'; 
const serviceUriStorages=require('../host').inventory + '/storages';
const serviceSearch = require('../host').inventory + '/docs/efr-kb-rtf';
const serviceUriInventories = require('../host').inventory + '/storages/578dcfd60b0aea003ebf0fd9/inventories'; // storeid pusat barang baru didatabase development: 578dcfd60b0aea003ebf0fd9
 
export class Service extends RestService{

  constructor(http, aggregator) {
    super(http, aggregator);
  }

  search(keyword) {
    return super.get(serviceUri);
  }

  getById(id)
  {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  } 
  getDataByIdVariant(id)
  {
    var endpoint = `${serviceUriInventories}/${id}`;
    return super.get(endpoint);
  }

  create(data)
  {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  } 
   
  getAllStorageById(id)
  {
    var endpoint = `${serviceUriStorages}/${id}`;
    return super.get(endpoint);
  }
  
  getOutByCode(code) 
  {
      var endpoint = `${serviceSearch}?keyword=${code}`;
      return super.get(endpoint);
  }
}
