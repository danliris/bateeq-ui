import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
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
    this.data.RO = newValue ? newValue.RO : "";
    this.data.Article = newValue ? newValue.Article : "";
    this.data.Style = newValue ? newValue.Style : "";
    this.data.Counter = newValue ? newValue.Counter : "";
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
        switch (response) {
          case 'ok':
            this.service.deleteDetail(this.data).then(result => { this.options.viewCallback(); });
            break;
          case 'cancelled':
            break;
        }
      });
  }
}
