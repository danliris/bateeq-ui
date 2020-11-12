import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = 'stock-opname';

export class Service extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}/by-user`;
        return super.list(endpoint, info);
    }

    update(data) {
        var endpoint = `${serviceUri}/by-user`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/by-user/${data._id}`;
        return super.delete(endpoint, data);
    }

    getById(id) {
        var endpoint = `${serviceUri}/by-user/${id}`;
        return super.get(endpoint);
    }

    getItemStock(args){
        var endpoint = `inventory/stock?source=${args.source}&itemId=${args.itemData}`;
        return super.get(endpoint);
    }
}