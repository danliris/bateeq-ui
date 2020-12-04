import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

export class ServiceMembership extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "authBateeqshop");
  }


  getListMembership(args) {
    let endpoint = "membership";
    return super.list(endpoint, args);
  }
}
