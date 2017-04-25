import { inject, useView, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from '../service';
import moment from 'moment';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

@inject(DialogController, Service)

@useView("modules/daily-product-sales-store/dialogs/products-detail-dialog.html")
export class ProductDetailDialog {
    imageUrl = "";

    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }

    activate(model) {
        this.data = model.data;
        this.error = model.error;
        var dateFrom = moment(new Date()).startOf('day');
        var dateTo = moment(new Date()).endOf('day');
        this.summary = [];
        this.masterItem = {};
        this.totalItem = 0;

        this.service.getSummaryByProductID(dateFrom.format(), dateTo.format(), this.data.itemId)
            .then((result) => {
                this.summary = result;
                if (result.length > 0) {
                    this.masterItem = result[0].masterItem[0];
                    if (result.length > 1) {
                        this.totalItem = result.reduce((prev, curr) => prev.quantity + curr.quantity);
                    } else {
                        this.totalItem = result[0].quantity;
                    }
                }
            });

        var config = Container.instance.get(Config);
        this.imageUrl = `${config.getEndpoint("master").client.baseUrl}items/finished-goods/image/${this.data.itemId}`;
    }
}