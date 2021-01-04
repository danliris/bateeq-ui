import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

// const serviceUri = "pageSize";
const serviceUri = 'membership';

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "customers");
  }

  getCustomers(args) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, args);
  }

  search(args) {
    let endpoint = `${serviceUri}/FindAllMembership`;
    return super.list(endpoint, args);
  }

  getAvailableMembership(args){
    let endpoint = `${serviceUri}/available`;
    return super.list(endpoint, args);
  }

  getMembershipById(id) {
    var endpoint = `${serviceUri}/FindMembership/${id}`;
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      return Promise.resolve(result);
    });
  }

  create(data) {
    var endpoint = `${serviceUri}/AddMembership`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUri}/EditMembership`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/DeleteMembership/${data.id}`;
    return super.delete(endpoint, data);
  }
}
