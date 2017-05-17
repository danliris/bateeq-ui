import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'docs/efr-pk/expedition';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("merchandiser");

    return endpoint.find(resource, { keyword: keyword })
        .then(results => {
            return results.data.map(spk => {
                spk.toString = function () {
                    return this.packingList
                }
                if (spk.items.length > 1) {
                    spk.quantity = spk.items.reduce((prev, curr) => parseInt(prev.quantity) + parseInt(curr.quantity));
                } else {
                    spk.quantity = parseInt(spk.items[0].quantity);
                }
                return spk;
            })
        });
}