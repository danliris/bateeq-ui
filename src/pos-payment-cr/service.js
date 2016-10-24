import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../rest-service';

const serviceUri = require('../host').pos + '/docs/payment';
const serviceUriBank = require('../host').pos + '/banks';
const serviceUriCardType = require('../host').pos + '/cardtypes';
const serviceUriPaymentType = require('../host').pos + '/paymenttypes'; 
const serviceUriPromo = require('../host').promo + '/docs/promoes'; 

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
    
    getPaymentType() {
        return super.get(serviceUriPaymentType);
    }
    
    getPaymentTypeById(id) {
        var endpoint = `${serviceUriPaymentType}/${id}`;
        return super.get(endpoint);
    }
    
    getPromoByStoreVariantDatetime(storeId, variantId, datetime) {
        var endpoint = `${serviceUriPromo}/${storeId}/${variantId}/${datetime}`;
        return super.get(endpoint);
    }
}
