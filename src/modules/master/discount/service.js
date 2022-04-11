import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service'; 
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = "discount";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "pos");
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

    getItemByCode(code) {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core").client.baseUrl + 'items/finished-goods/code-discount/' + code;
        //var endpoint = `${serviceUri}/filter/item/${code}`;
        return super.get(endpoint);
    }

    getAvailableDiscount(discount) {
        var endpoint = `${serviceUri}/filter/discount/${discount}`;
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

    getStorebyCategory(category) {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core").client.baseUrl + 'master/stores/category?category=' + category;
        return super.get(endpoint);
    }

    getItemByRo(ro) {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core").client.baseUrl + 'items/finished-goods/ro-discount/' + ro;
        return super.get(endpoint);
    }
}