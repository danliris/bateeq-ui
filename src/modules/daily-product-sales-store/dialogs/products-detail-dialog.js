import { inject, useView, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)

@useView("modules/daily-product-sales-store/dialogs/products-detail-dialog.html")
export class ProductDetailDialog {
    constructor(dialogController){
        this.dialogController = dialogController;
    }

    activate(model){
        this.data = model.data;
    }
}