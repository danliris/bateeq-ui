import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = "ro-retails";
const costCalculationRetailServiceUri = "cost-calculation-retails";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "md");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    getById(id) {
        
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getCostCalculationRetailById(id) {
        var endpoint = `${costCalculationRetailServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getArticleColors() {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core");
        var uri = `articles/colors/all`;
        let promise = endpoint.find(uri);
        this.publish(promise)
        return promise
            .then(result => {
                this.publish(promise);
                return Promise.resolve(result.data.data);
            });
    }

    fetchStores(info) {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("master");
        var uri = `stores`;
        let promise = endpoint.find(uri, info);
        this.publish(promise);
        return promise
            .then(result => {
                this.publish(promise);
                result.data.sort((a,b) => {
                    if (a.code < b.code) return -1;
                    if (a.code > b.code) return 1;
                });
                return Promise.resolve(result.data);
            });
    }

    getPdfById(id) {
        
        var endpoint = `${serviceUri}/pdf/${id}`;
        
        return super.getPdf(endpoint);
    }
}
