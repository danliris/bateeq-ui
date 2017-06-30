import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';

const serviceUri = '/docs/efr-tb-bbt';
const serviceOutUri = '/docs/efr-pk-ba';
const serviceUriStorages = '/storages';

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    listPending(info) {
        var endpoint = `${serviceUri}/pending`;
        return super.list(endpoint, info);
    }

    getPendingSPKById(id) {
        var endpoint = `${serviceUri}/pending/${id}`;
        return super.get(endpoint);
    }

}