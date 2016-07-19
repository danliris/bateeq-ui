import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class RestService {

    constructor(HttpClient, EventAggregator) {
        this.http = HttpClient;
        this.header = {
            "Content-Type": "application/json; charset=UTF-8"
        };

        this.eventAggregator = EventAggregator;
    }

    publish(promise) {
        this.eventAggregator.publish('httpRequest', promise);
    }

    parseResult(result) {
        return new Promise((resolve, reject) => {
            if (result.error)
                reject(result.error);
            else {
                resolve(result.data)
            }
        });
    }

    get(endpoint, header) {
        var request = {
            method: 'GET',
            headers: new Headers(Object.assign({}, this.header, header))
        };
        var getRequest = this.http.fetch(endpoint, request)
        this.publish(getRequest);
        return getRequest
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.publish(getRequest);
                return this.parseResult(result);
            });

    }

    post(endpoint, data, header) {
        var request = {
            method: 'POST',
            headers: new Headers(Object.assign({}, this.header, header)),
            body: JSON.stringify(data)
        };
        return this.http.fetch(endpoint, request)
            .then(response => {
                return response.json();
            })
            .then(result => this.parseResult(result));
    }

    put(endpoint, data, header) {
        var request = {
            method: 'PUT',
            headers: new Headers(Object.assign({}, this.header, header)),
            body: JSON.stringify(data)
        };

        return this.http.fetch(endpoint, request)
            .then(response => {
                if (response.status != 204)
                    return response.json();
                else
                    return new Promise((resolve, reject) => {
                        resolve({});
                    });
            })
            .then(result => this.parseResult(result));
    }

    delete(endpoint, data, header) {
        var request = {
            method: 'DELETE',
            headers: new Headers(Object.assign({}, this.header, header)),
            body: JSON.stringify(data)
        };
        return this.http.fetch(endpoint, request)
            .then(response => {
                if (response.status != 204)
                    return response.json();
                else
                    return new Promise((resolve, reject) => {
                        resolve({});
                    });
            })
            .then(result => this.parseResult(result));
    }
}