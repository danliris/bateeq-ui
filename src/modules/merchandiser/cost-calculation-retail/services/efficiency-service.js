import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "efficiencies";

export class EfficiencyService extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "md");
    }

    getEffByQty(qty) {
        var endpoint = `${serviceUri}/quantity/${qty}`;
        return super.get(endpoint);
    }
}