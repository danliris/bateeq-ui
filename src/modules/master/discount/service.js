import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service'; 

const serviceUri = "master-discount";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "inventory");
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
        var endpoint = `${serviceUri}/filter/item/${code}`;
        return super.get(endpoint);
    }

    getAvailableDiscount(discount) {
        var endpoint = `${serviceUri}/filter/discount/${discount}`;
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