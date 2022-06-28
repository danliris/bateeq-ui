import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const reportUri = "docs/efr-kb-exp/report";
const omzetUri = "fact-penjualan";
const omzetSumUri = "fact-penjualan-summary";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "etl");
  }

  search(info) {
    var uri = `${omzetUri}/${info.dateFrom}/${info.dateTo}`;
    return super.nget(uri);
  }

  search1(info) {
    var uri = `${omzetSumUri}/${info.dateFrom}/${info.dateTo}`;
    return super.nget(uri);
  }

  generateExcel(info) {
    var uri = `${reportUri}/export/${info.storageId}/${info.dateFrom}/${info.dateTo}/${info.transaction}/${info.packingListStatus}`;
    return super.getXls(uri);
  }
}
