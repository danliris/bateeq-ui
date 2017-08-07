import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"


const serviceUri = '/items/finished-goods';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "master");
  }

  // search(keyword) {
  //   return super.get(serviceUri);
  // }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  searchByRo(ro) {
    var roTemp =encodeURIComponent(ro);
    var endpoint = `${serviceUri}/ro/${roTemp}`;
    return super.get(endpoint);
  }

  searchAll(imageFile) {
    var endpoint = `${serviceUri}/readAll/${imageFile}`;
    return super.get(endpoint);
  }

  getColors() {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");
    var uri = `articles/colors/all`;
    return endpoint.find(uri, {});
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  // getMotif(code) {
  //   var config = Container.instance.get(Config);
  //   var endpoint = config.getEndpoint("core");
  //   var uri = `articles/motifs/code/${code}`;
  //   return endpoint.find(uri, {});
  // }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data._id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data._id}`;
    return super.delete(endpoint, data);
  }

  getByCode(code) {
    var endpoint = `${serviceUri}?keyword=${code}`;
    return super.get(endpoint);
  }


  updateProductImage(data) {
    var header;
    var request = {
      method: "POST",
      headers: new Headers(Object.assign({
        'Content-type': 'application/json'
      }, this.header, header)),
      body: JSON.stringify(data)
    }

    var promise = this.endpoint.client.fetch('upload/product-image', request);
    this.publish(promise);
    return promise.then(
      response => {
        this.publish(promise);
        if (response) {
          return response.json().then(result => {
            if (result) {
              if (result.error)
                return Promise.reject(result.error);
              else
                return Promise.resolve(result.data);
            } else {
              return Promise.resolve({});
            }
          });
        } else {
          return Promise.resolve({});
        }
      }
    )
  }
}
