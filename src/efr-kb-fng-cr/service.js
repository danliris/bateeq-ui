import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../rest-service';
 
const serviceUri = 'http://bateeq-inventory-api.au-syd.mybluemix.net/v1/inventories/docs/efr-kb-fng'; 
const serviceUriStorages='http://bateeq-inventory-api.au-syd.mybluemix.net/v1/inventories/storages';
const serviceSearch = 'http://bateeq-inventory-api.au-syd.mybluemix.net/v1/inventories/docs/efr-kb-rtf';
const serviceUriInventories = 'http://bateeq-inventory-api.au-syd.mybluemix.net/v1/inventories/storages/578dcfd60b0aea003ebf0fd9/inventories'; // storeid pusat barang baru didatabase development: 578dcfd60b0aea003ebf0fd9
 
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
