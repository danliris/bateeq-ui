import { RestService } from '../../../utils/rest-service';
const urlService = 'stock-opname-balance';

export class Service extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "inventory");
    }

    getBalanceByStorage(data) {
        var endpoint = `${urlService}/storage/${data.code}`;
        return super.get(endpoint);
    }
}