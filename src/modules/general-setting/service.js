import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'sales/garment-booking-orders';
const MaxWHServiceUri = 'max-wh-confirms';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "rewardPoints");
    }

    getRewardPoint(){
        var header;
        var endpoint = 'getAllRewardPoints';
        var request = {
            method: "GET",
            headers: new Headers(Object.assign({
            'Content-type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRhdmlkbm9iZWxzaHRAZ21haWwuY29tIiwiZW1haWwiOiJkYXZpZG5vYmVsc2h0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiODEzNDA5OTkyNDUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9vdGhlcnBob25lIjoiMCIsIm5iZiI6MTYwMzI1NjgzOCwiZXhwIjoxMjk2MzczMzYzOCwiaWF0IjoxNjAzMjU2ODM4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMyMi8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMyMi8ifQ.bEIuo5njWt3vIqBQGCQzLyEaMmUCaRtpUI2BBEy2zCo'
            }, this.header, header))
        }
        
        var promise = this.endpoint.find(endpoint);
        this.publish(promise);
        return promise
            .then((result) => {
                this.publish(promise);
                return Promise.resolve(result);
            });
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    searchWHConfirm(info) {
        var endpoint = `${MaxWHServiceUri}`;
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

    update(data) {
        var endpoint = 'updateRewardPoint';
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    cancelBooking(data) {
        var endpoint = `${serviceUri}/BOCancel/${data.id}`;
        return super.put(endpoint, data);
    }

    expiredBooking(data) {
        var endpoint = `${serviceUri}/BODelete/${data.id}`;
        return super.put(endpoint, data);
    }

    getMasterPlanByBookingOrderId(info) {
        var config = Container.instance.get(Config);
        var _serviceUri = `sewing-blocking-plans`;
        var _endpoint = config.getEndpoint("nmasterplan");
        return _endpoint.find(_serviceUri, info)
            .then(result => {
                return result.data;
            });
    }
}
