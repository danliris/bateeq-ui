import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = "banks";

export class Service extends RestService {
    Id = null;

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
        this.Id = data._id;

        if (!this.Id) {
            this.Id = data.Id;
        }

        var endpoint = `${serviceUri}/${this.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        this.Id = data._id;

        if (!this.Id) {
            this.Id = data.Id;
        }

        var endpoint = `${serviceUri}/${this.Id}`;
        return super.delete(endpoint, data);
    } 
}