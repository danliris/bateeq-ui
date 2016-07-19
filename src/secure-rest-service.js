import {RestService} from './rest-service';

export class SecureService extends RestService {
  constructor(http, aggregator) {
    super(http, aggregator);
    this.header = {
      "Content-Type": "application/json; charset=UTF-8"
    };
  }
}
