import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "customers");
  }

  getCustomers(args) {
    let endpoint = "getUser";
    return super.list(endpoint, args);
  }

  search(args) {
    let endpoint = "searchUser";
    return super.list(endpoint, args);
  }

  getCustomersById(id) {
    var endpoint = `getUserDetail/${id}`;
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      return Promise.resolve(result);
    });
  }

  getAddressBookById(id) {
    var endpoint = `getAddressBook/${id}`;
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      return Promise.resolve(result);
    });
  }

  generateExcel(dateFrom, dateTo) {
    var endpoint = `${serviceUri}/download?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    return super.getXls(endpoint);
  }
}
