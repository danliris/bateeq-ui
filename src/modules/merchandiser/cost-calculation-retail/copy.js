import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./services/service";
import { SeasonService } from "./services/season-service";

@inject(Router, Service, SeasonService)
export class Copy {
  constructor(router, service, seasonService) {
    this.router = router;
    this.service = service;
    this.seasonService = seasonService;
    this.data = {};
    this.error = {};
  }

  async activate(params) {
    this.id = params.id;
    this.data = await this.service.getById(this.id);
    this.clearDataProperties();
    await this.getSeasonWithCode();
  }

  clearDataProperties() {
    [
      "Id",
      "Code",
      "RO",
      "RO_SerialNumber",
      "ImagePath",
      "RO_RetailId",
      "_IsDeleted",
      "Active",
      "_CreatedUtc",
      "_CreatedBy",
      "_CreatedAgent",
      "_LastModifiedUtc",
      "_LastModifiedBy",
      "_LastModifiedAgent"
    ].forEach(prop => delete this.data[prop]);
    this.data.CostCalculationRetail_Materials.forEach(ccm => {
      [
        "Id",
        "Code",
        "PO",
        "PO_SerialNumber",
        "_IsDeleted",
        "Active",
        "_CreatedUtc",
        "_CreatedBy",
        "_CreatedAgent",
        "_LastModifiedUtc",
        "_LastModifiedBy",
        "_LastModifiedAgent"
      ].forEach(prop => delete ccm[prop]);
    });
  }

  async getSeasonWithCode() {
    if (!this.data.Season.code) {
      const season = await this.seasonService.getSeasonById(
        this.data.Season._id
      );
      this.data.Season = season ? season : null;
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
