import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = `voucher/membership`;

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "voucher");
  }

  search(args) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, args);
  }

  create(args) {
    let endpoint = `${serviceUri}`;
    return super.post(endpoint, args);
  }

  edit(args) {
    let endpoint = "voucher";
    return super.put(endpoint, args);
  }

  delete(id) {
    let endpoint = `voucher/${id}`;
    return super.delete(endpoint);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    // return super.get(endpoint);
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      return Promise.resolve(result);
    });
  }
}
