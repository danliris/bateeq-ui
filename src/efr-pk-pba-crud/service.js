import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../rest-service';

const serviceUri = require('../host').merchandiser + '/docs/efr-pk-pba';
const serviceUriDraft = require('../host').merchandiser + '/docs/efr-pk-pba/draft'; 
const serviceUriInventories = require('../host').inventory + '/storages/578dd0860b0aea003ebf0fda/inventories';  


export class Service extends RestService {

  constructor(http, aggregator) {
    super(http, aggregator);
  }

  search(keyword) {
    return super.get(serviceUri);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  getInventoryByIdVariantAndIdStorage(id) {
    var endpoint = `${serviceUriInventories}/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  } 

  getByCode(code) {
    var endpoint = `${serviceSearch}?keyword=${code}`;
    return super.get(endpoint);
  }

  delete(data) {
    var endpoint = `${serviceUriDraft}/${data._id}`;
    return super.delete(endpoint, data);
  }
  
  getModuleConfig() {
    var endpoint = require('../host').core + '/modules?keyword=EFR-PK/PBA';
    return super.get(endpoint)
      .then(results => {
        if (results && results.length == 1)
          return Promise.resolve(results[0].config);
        else
          return Promise.resolve(null);
      });
  }
  
  getStorageById(id) {
    var endpoint = `${require('../host').inventory + '/storages'}/${id}`;
    return super.get(endpoint);
  }
}
