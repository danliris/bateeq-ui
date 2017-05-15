import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const reportUri = "docs/efr-kb-exp/report"

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "inventory");
    }

    search(info) {
        var uri = `${reportUri}/${info.storageId}/${info.dateFrom}/${info.dateTo}`;
        console.log(uri);
        return super.get(uri);
    }
}