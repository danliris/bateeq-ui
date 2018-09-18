import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'docs/transfer-out';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory");
    
    return endpoint.find(resource, { keyword: keyword })
        .then(results => {
            return results.data;
        });    
}