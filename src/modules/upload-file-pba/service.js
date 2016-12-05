import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../rest-service';


export class Service extends RestService {

  constructor(http, aggregator) {
    super(http, aggregator);
  }

  search(keyword) {
    return super.get(require('../../host').merchandiser + '/docs/efr-pk-pba');
  }


  getModuleConfig() {
    var endpoint = require('../../host').master + '/modules?keyword=EFR-PK/PBA';
    return super.get(endpoint)
      .then(results => {
        if (results && results.length == 1)
          return Promise.resolve(results[0].config);
        else
          return Promise.resolve(null);
      });
  }

  getStorageById(id) {
    var endpoint = `${require('../../host').master + '/storages'}/${id}`;
    return super.get(endpoint);
  }

  getById(id) {
    var endpoint = `${require('../../host').merchandiser + '/docs/efr-pk-pba/draft'}/${id}`;
    return super.get(endpoint);
  }
}
