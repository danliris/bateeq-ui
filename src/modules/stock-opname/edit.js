import { bindable, inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class Edit {
  @bindable data;
  @bindable error;
  hasCancel = true;
  hasDelete = false;
  hasSave = true;

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    if (!this.data.isProcessed) {
      var inventories = await this.service.getItemInInventory(id);
      for (var a of this.data.items) {
        for (var b of inventories) {
          if (b && b.item) {
            if (a.item.code === b.item.code)
              a.qtyBeforeSO = b.quantity;
          }
        }
        if ((a.qtyBeforeSO - a.qtySO) === 0)
          a["isView"] = true;
        else
          a["isEdit"] = true;
      }
    }
    this.error = {
      storage: "",
      items: []
    }
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  save(event) {

    this.service.update(this.data)
      .then(result => {
        this.cancel();
      })
      .catch(e => {
        if (e.storage)
          this.error["storage"] = e.storage;
        if (e.items)
          this.error["items"] = e.items;
      });
  }
}