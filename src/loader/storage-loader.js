import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'storages';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("master");
    
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data.map(storage => {
                storage.toString = function () {
                    return [this._id,this.code, this.name]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
                return storage;
            })
        });    
}