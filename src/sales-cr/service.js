import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../rest-service';

const serviceUri = require('../host').sales + '/docs/sales';
const serviceUriBank = require('../host').master + '/banks';
const serviceUriCardType = require('../host').master + '/cardtypes';
const serviceUriPromo = require('../host').sales + '/docs/promos'; 

export class Service extends RestService {

    constructor(http, aggregator) {
        super(http, aggregator);
    }

    search(keyword) {
        return super.get(serviceUri);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    } 
    
    getBank() {
        return super.get(serviceUriBank);
    }
    
    getCardType() {
        return super.get(serviceUriCardType);
    }
    
    getPromoByStoreVariantDatetime(storeId, variantId, datetime) {
        var endpoint = `${serviceUriPromo}/${storeId}/${variantId}/${datetime}`;
        return super.get(endpoint);
    }
}
