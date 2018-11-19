import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'search-by-counter';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("md");

    return endpoint.find(resource.concat('/' + keyword))
        .then(results => {
            return results.data;
        })};
