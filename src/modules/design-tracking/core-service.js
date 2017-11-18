import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';

const designTrackingReasonUri = 'design-tracking-reasons';

export class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "master");
    }

    searchDesignTrackingReason(info) {
        var endpoint = `${designTrackingReasonUri}`;
        return super.list(endpoint, info);
    }
}