import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const reportUri = "spkdocs/monitoring"

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "merchandiser");
    }

    search(info) {
        //var uri = `${reportUri}/${info.dateFrom}/${info.dateTo}/${info.transaction}/${info.storageId}/${info.packingListStatus}`;
        //return super.get(uri);
        var endpoint = `${reportUri}/by-user?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&destinationCode=${info.destinationCode}&status=${info.status}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = `${reportUri}/by-user/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&destinationCode=${info.destinationCode}&status=${info.status}`;
        return super.getXls(endpoint);
    }
}