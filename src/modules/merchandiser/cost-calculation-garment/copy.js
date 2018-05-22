import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./services/service";

@inject(Router, Service)
export class Copy {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  async activate(params) {
    this.id = params.id;
    this.data = await this.service.getById(this.id);
    ['Id', 'Code', 'RO', 'RO_SerialNumber', "ImagePath", "RO_RetailId", '_IsDeleted', 'Active', '_CreatedUtc', '_CreatedBy', '_CreatedAgent', '_LastModifiedUtc', '_LastModifiedBy', '_LastModifiedAgent'].forEach(prop => delete this.data[prop]);
    this.data.CostCalculationGarment_Materials.forEach(ccm => {
      ['Id', 'Code', 'PO', 'PO_SerialNumber', '_IsDeleted', 'Active', '_CreatedUtc', '_CreatedBy', '_CreatedAgent', '_LastModifiedUtc', '_LastModifiedBy', '_LastModifiedAgent'].forEach(prop => delete ccm[prop]);
    });
    if (!this.data.Line.Code){
      const {Code} = await this.service.getLineById(this.data.Line.Id);
      this.data.Line.Code = Code;
    }
  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.id });
  }

  saveCallback(event) {
    this.service
      .create(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.error = e;
      });
  }
}
