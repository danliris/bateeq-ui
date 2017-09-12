import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasDelete = false;
  hasSave = false;
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    await this.service.getById(id).then((dataById) => {
      if (!dataById.isProcessed) {
        this.service.getItemInInventory(id).then((itemInInventoryById) => {
          this.hasDelete = true;
          for (var a of dataById.items) {
            for (var b of itemInInventoryById) {
              if (b && b.item) {
                if (a.item.code === b.item.code)
                  a.qtyBeforeSO = b.quantity;
              }
            }
          }
        });
      }

      for (var a of dataById.items) {
        a["isView"] = true;
      }

      this.data = dataById;
    });
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  delete(event) {
    this.service.delete(this.data)
      .then(result => {
        this.cancel();
      });
  }
}