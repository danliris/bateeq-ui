import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../rest-service';
 
const serviceUri = 'http://bateeq-article-api.au-syd.mybluemix.net/v1/articles/seasons';
 
export class Service extends RestService{

  constructor() {
    super();
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

  update(data)
  {
    var endpoint = `${serviceUri}/${data._id}`;
    return super.put(endpoint, data);
  }  

  delete(data)
  {
    var endpoint = `${serviceUri}/${data._id}`;
    return super.delete(endpoint, data);
  }  
}
