import { RestService } from "../../../utils/rest-service";

const serviceUri = "booking-orders";
const detailServiceUri = "booking-order-details";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "masterplan");
  }

  search(info) {
    return super.list(serviceUri, info);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  confirm(data) {
    const endpoint = `${serviceUri}/confirm/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  deleteDetail(data) {
    const endpoint = `${detailServiceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  setRemainingOrderQuantity(data) {
    const endpoint = `${serviceUri}/set-remaining-order-quantity`;
    return super.put(endpoint, data);
  }

  getBlockingPlanById(id) {
    var endpoint = `blocking-plans/${id}`;
    return super.get(endpoint);
  }
}
