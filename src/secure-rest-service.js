import {RestService} from './rest-service';

export class SecureService extends RestService {
  constructor() {
    super();
    this.header = {
      "Content-Type": "application/json; charset=UTF-8"
    };
  }
}
