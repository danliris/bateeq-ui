import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../rest-service';
 
const serviceUri = require('../host').inventory + '/docs/efr-kb-exb'; 
const serviceUriSearch = require('../host').inventory + '/docs/efr-pk-bj';
const serviceUriSearch2 = require('../host').inventory + '/docs/efr-pk-ba';
const serviceUriStorages=require('../host').inventory + '/storages';

 
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

  create(data)
  {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  } 
   
  getAllStorage()
  {
    var endpoint = `${serviceUriStorages}`;
    return super.get(endpoint);
  }
  
  getOutByCode(code) 
  {
      var endpoint = `${serviceUriSearch}?keyword=${code}`;
      return super.get(endpoint);
  }
}