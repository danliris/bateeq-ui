import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../utils/rest-service';
  
const serviceUri = '/docs/efr-tb-bat';
const serviceOutUri = '/docs/efr-tb-bat';
const serviceUriStorages= '/storages';
 
export class Service extends RestService{

  constructor(http, aggregator, config, api) {
      super(http, aggregator, config, "inventory");
  }

  search(keyword) {
      return super.get(serviceUri);
  }

  getById(id)
  {
      var endpoint = `${serviceUri}/${id}`;
      return super.get(endpoint);
  }
  
  create(data)
  {
      var endpoint = `${serviceUri}`;
      return super.post(endpoint, data);
  } 
  
  searchPending(){
      var endpoint = `${serviceUri}/pending`;
      return super.get(endpoint);
  }

  getPendingSPKById(id){
      var endpoint = `${serviceUri}/pending/${id}`;
      return super.get(endpoint);
  }
}