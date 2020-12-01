import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'productBateeqshop';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("product/filter-product-ro");
    
    return endpoint.find(resource, { keyword: keyword })
        .then(results => {
            return results.data;
        });    
}