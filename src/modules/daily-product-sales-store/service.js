import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = "docs/sales/products"
const reportSalesUri = "docs/sales/reports/daily/stores-product"

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getSummary(dateFrom, dateTo, query) {
        var endpoint = `${serviceUri}/${dateFrom}/${dateTo}?page=${query.page}&size=${query.size}`;
        return super.get(endpoint);
    }

    getSummaryByProductID(dateFrom, dateTo, productId) {
        var endpoint = `${reportSalesUri}/${dateFrom}/${dateTo}/${productId}`;
        return super.get(endpoint);
    }

    getStoreSummary(dateFrom, dateTo, query) {
        var endpoint = `${reportSalesUri}/${dateFrom}/${dateTo}?page=${query.page}&size=${query.size}`;
        return super.get(endpoint);
    }

    getImage(itemId) {
        var config = Container.instance.get(Config);
        var endpoint = `${config.getEndpoint("master").client.baseUrl}items/finished-goods/image/${itemId}`;
        return super.get(endpoint);
    }
}