import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = "omzet-per-day"

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getSalesSummary(dateFrom, dateTo){
        var endpoint = `${serviceUri}?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.get(endpoint);
    }
}