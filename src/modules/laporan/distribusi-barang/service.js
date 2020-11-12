import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const reportUri = "expedition/monitoring"

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "inventory");
    }

    search(info) {
        var endpoint = `${reportUri}/by-user?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&destinationCode=${info.destinationCode}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var uri = `${reportUri}/by-user/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&destinationCode=${info.destinationCode}`;
        return super.getXls(uri);
    }
}