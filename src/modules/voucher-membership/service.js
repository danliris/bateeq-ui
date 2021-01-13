import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = `voucher/membership`;
const serviceMembershipUri = `membership`;
const serviceProductUri = `product`;

class Service extends RestService {
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
    let endpoint = `${serviceUri}`;
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
      if (result.error)
        return Promise.reject(result.error);
      else
        return Promise.resolve(result);
    });
  }
}

class ServiceMembership extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "authBateeqshop");
  }

  getListMembership(args) {
    let endpoint = `${serviceMembershipUri}/FindAllMembership`;
    return super.list(endpoint, args);
  }
}

class ServiceProduct extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "productBateeqshop");
  }

  getProductByIds(ids) {
    let endpoint = `${serviceProductUri}/find-by-ids`;
    let queryString = "?";

    if (ids.length > 0)
      ids.map(x => {
        queryString += `productIds=${x}&`
      });

    // return super.list(endpoint, args);
    let promise = this.endpoint.find(endpoint + queryString);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      if (result.error)
        return Promise.reject(result.error);
      else
        return Promise.resolve(result)
    });
  }
}

export {
  Service,
  ServiceMembership,
  ServiceProduct,
};
