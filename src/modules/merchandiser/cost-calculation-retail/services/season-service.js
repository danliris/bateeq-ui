import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "articles/seasons";

export class SeasonService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  getSeasonById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }
}
