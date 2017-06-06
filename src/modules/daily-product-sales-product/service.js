import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = "docs/sales/products"
const reportSalesUri = "docs/sales/reports/daily/products"

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getSummary(dateFrom, dateTo, query) {
        var endpoint = `${reportSalesUri}/${dateFrom}/${dateTo}?page=${query.page}&size=${query.size}`;
        return super.get(endpoint);
    }
}