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
    this.data = await this.service.getById(id);
    if(!this.data.isProcessed){
        var inventories = await this.service.getItemInInventory(id);
        this.hasDelete = true;
        for(var a of this.data.items){
            for(var b of inventories){
                if(b && b.item){
                    if(a.item.code === b.item.code)
                        a.qtyBeforeSO = b.quantity;
                }
            }
        }
    }
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