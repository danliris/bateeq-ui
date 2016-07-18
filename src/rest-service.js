import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

// @inject(HttpClient)
export class RestService {

    constructor() {
        this.http = new HttpClient();
        this.header = {
            "Content-Type": "application/json; charset=UTF-8"
        };
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
                return response.json();
            })
            .then(result => this.parseResult(result));
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

    delete(endpoint, data, header) {
        var request = {
            method: 'DELETE',
            headers: new Headers(Object.assign({}, this.header, header)),
            body: JSON.stringify(data)
        };
        return this.http.fetch(endpoint, request)
            .then(response => {
                return response.json();
            })
            .then(result => this.parseResult(result));
    }
}