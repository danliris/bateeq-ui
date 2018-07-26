import { inject, bindable, computedFrom } from "aurelia-framework";
import moment from "moment";
import { Service } from "./service";
const BuyerLoader = require("../../../loader/buyer-loader");
const SectionLoader = require("../../../loader/section-loader");

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data = {};
  @bindable error = {};

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  };
  detailConfirmsInfo = {
    columns: [
      { header: "RO" },
      { header: "Artikel" },
      { header: "Style" },
      { header: "Konter" },
      { header: "Jumlah" },
      { header: "Tanggal Pengiriman" },
      { header: "Tanggal Confirm" },
      { header: "Keterangan" }
    ],
    options: {},
    onAdd: function() {
      this.data.DetailConfirms.push({});
    }.bind(this)
  };

  get buyerLoader() {
    return BuyerLoader;
  }

  get sectionLoader() {
    return SectionLoader;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return this.data.Id && this.data.Id != 0;
  }

  constructor(service) {
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.isConfirmBooking = this.context.isConfirmBooking
      ? this.context.isConfirmBooking
      : false;
    if (this.data.DetailConfirms) {
      if (this.data.DetailConfirms.length > 0 && !this.isConfirmBooking) {
        this.detailConfirmsInfo.columns.push({ header: "Cancel Confirm" });
      }
    }
    this.detailConfirmsInfo.options.isConfirmBooking = this.isConfirmBooking;
    this.detailConfirmsInfo.options.readOnly = this.readOnly;
    if (this.context.view) {
      this.detailConfirmsInfo.options.viewCallback = this.context.view.bind(
        this.context,
        { id: this.data.Id }
      );
    }
    if (!this.data.BookingDate) {
      this.data.BookingDate = moment()
        .startOf("day")
        .toDate();
    }
  }
}
