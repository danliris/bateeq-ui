import { inject, bindable } from "aurelia-framework";
import { Router, activationStrategy } from "aurelia-router";
import moment from "moment";
import { Dialog } from "../../../../components/dialog/dialog";
import { Service } from "../service";
const searchCCByRO = require("../../../../loader/search-by-ro-merchandiser");

@inject(Router, Dialog, Service)
export class DetailItem {
  disabled = true;
  controlOption = {
    control: {
      length: 12
    }
  };

  get costCalculationLoader() {
    return searchCCByRO;
  }

  constructor(router, dialog, service) {
    this.router = router;
    this.dialog = dialog;
    this.service = service;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    if (this.data.RO) {
      this.RO = {
        RO: this.data.RO,
        Article: this.data.Article,
        Style: this.data.Style,
        Counter: this.data.Counter
      };
    }
    if (!this.data.ConfirmDate) {
      this.data.ConfirmDate = moment()
        .startOf("day")
        .toDate();
    }
  }

  @bindable RO;
  ROChanged(newValue) {
    this.data.RO = newValue.RO;
    this.data.Article = newValue.Article;
    this.data.Style = newValue.Style;
    this.data.Counter = newValue.Counter;
  }

  oncancel(data) {
    this.dialog
      .prompt(
        "Cancel Confirm RO " +
          this.data.RO +
          " (Jumlah: " +
          this.data.Total +
          "). Lanjutkan?",
        "Cancel Confirm"
      )
      .then(response => {
        this.service.deleteDetail(this.data).then(result => {
          this.options.viewCallback();
        });
      });
  }
}
