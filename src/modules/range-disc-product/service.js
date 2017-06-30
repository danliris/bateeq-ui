import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = "range-disc-products";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "master");
    }

    search(info) {
        return super.list(serviceUri, info);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    } 

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    } 
}