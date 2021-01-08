import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "voucher");
  }


  getlist(args) {
    let endpoint = "voucher";
    return super.list(endpoint, args);
  }

  search(args) {
    let endpoint = "voucher/search";
    return super.list(endpoint, args);
  }

  create(args){
    let endpoint = "voucher";
    var request = args;
    if(args.productPurchase){
      var productPurchaseId = args.productPurchase.id;
      request.productPurchase = productPurchaseId;
    }
    if(args.productGift){
      var productGiftId = args.productGift.id;
      request.productGift = productGiftId;
    }
    return super.post(endpoint,request);
  }

  edit(args){
    let endpoint = "voucher";
    var request = args;
    var productPurchaseId = args.productPurchase.id;
    var productGiftId = args.productGift.id;
    request.productPurchase = productPurchaseId;
    request.productGift = productGiftId;
    return super.put(endpoint,request);
  }
  
  delete(id){
    let endpoint = `voucher/${id}`;
    return super.delete(endpoint);
  }

  getById(id) {
    var endpoint = `voucher/${id}`;
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      return Promise.resolve(result);
    });
  }

  getAddressBookById(id) {
    var endpoint = `getAddressBook/${id}`;
    var promise = this.endpoint.find(endpoint);
    this.publish(promise);
    return promise.then((result) => {
      this.publish(promise);
      return Promise.resolve(result);
    });
  }
}
