import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'categories';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("md");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data.map(Category => {
                Category.toString = function () {
                    return [this.Name, this.SubCategory]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
                return Category;
            });
        });
}