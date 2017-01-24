import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = "docs/sales"

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getSummaryStore(dateFrom, dateTo) {
        var endpoint = `${serviceUri}/${dateFrom}/${dateTo}/store`;
        return super.get(endpoint);
    }

    getSummaryPos(dateFrom, dateTo) {
        var endpoint = `${serviceUri}/${dateFrom}/${dateTo}/pos`;
        return super.get(endpoint);
    }
}