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
          console.log(dataById)
          this.hasDelete = true;
          for (var a of dataById.items) {
            let args = {
              itemData: a.item._id,
              source: dataById.storage._id
            };
            console.log(args)
            this.service.getItemStock(args).then((itemStockById) => {
                if (itemStockById && itemStockById.item) {
                  if (a.item.code === itemStockById.item.code)
                    a.qtyBeforeSO = itemStockById.quantity;
                  }
            });
            a["isView"] = true;
          }
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