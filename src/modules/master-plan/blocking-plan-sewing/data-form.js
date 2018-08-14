import { inject, bindable, computedFrom } from "aurelia-framework";
import { Router } from "aurelia-router";
import moment from "moment";
import { Service } from "./service";
const bookingOrderLoader = require("../../../loader/booking-order-loader");

@inject(Router, Service)
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

  detailConfirms_Info = {
    columns: [
      { header: "RO" },
      { header: "Artikel" },
      { header: "Style" },
      { header: "Konter" },
      { header: "Jumlah" },
      { header: "Keterangan" },
      { header: "Tanggal Pengiriman" }
    ]
  };

  workSchedules_Info = {
    columns: [
      { header: "Confirm" },
      { header: "RO" },
      { header: "Artikel" },
      { header: "Style" },
      { header: "Konter" },
      { header: "SMV Sewing" },
      { header: "Unit" },
      { header: "Tahun" },
      { header: "Week" },
      { header: "Remaining EH" },
      { header: "Jumlah Order" },
      { header: "Keterangan" },
      { header: "Tanggal Pengiriman" },
      { header: "Efisiensi (%)" },
      { header: "EH Booking" },
      { header: "Sisa EH" }
    ],
    onAdd: function () {
      this.data.WorkSchedules.push({});
    }.bind(this),
    options: { readOnly: this.readOnly }
  };

  get bookingOrderLoader() {
    return bookingOrderLoader;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() != "";
  }

  @bindable selectedBookingOrder;
  @bindable buyer;
  @bindable orderQuantity;
  @bindable remark;
  @bindable detailConfirms;
  async selectedBookingOrderChanged(newValue) {
    let data;
    if (this.readOnly || this.isEdit) {
      data = newValue;
    } else {
      data =
        newValue && newValue.Id
          ? await this.service.getBookingOrderById(newValue.Id)
          : null;
    }
    this.data.BookingOrderId = data ? data.Id : 0;
    this.data.BookingDate = data ? data.BookingDate : "";
    this.buyer = data ? data.Buyer : {};
    this.orderQuantity = data ? data.OrderQuantity : 0;
    this.data.DeliveryDate = data ? data.DeliveryDate : "";
    this.remark = data ? data.Remark : "";
    this.detailConfirms = data ? data.DetailConfirms : null;
  }

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  columnPreview = {
    thisYear: [],
    nextYear: []
  };
  weeklyPlansPreview = {
    thisYear: [],
    nextYear: []
  };
  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    if ((this.readOnly || this.isEdit) && this.data) {
      this.selectedBookingOrder = this.data.BookingOrder;
    }
    this.workSchedules_Info.options.readOnly = this.readOnly;

    const getYear = new Date().getFullYear();
    const getWeeklyPlanPromise = {
      thisYear: this.service.getWeeklyPlanByYear(getYear.toString()),
      nextYear: this.service.getWeeklyPlanByYear((getYear + 1).toString())
    };
    const weeklyPlans = await Promise.all([
      getWeeklyPlanPromise.thisYear,
      getWeeklyPlanPromise.nextYear
    ]);

    this.columnPreview.thisYear.push(
      ...this.getPreviewWeeklyPlanColumns(weeklyPlans[0][0])
    );
    this.columnPreview.nextYear.push(
      ...this.getPreviewWeeklyPlanColumns(weeklyPlans[1][0])
    );

    this.weeklyPlansPreview.thisYear.push(
      ...this.getPreviewWeeklyPlansData(weeklyPlans[0])
    );
    this.weeklyPlansPreview.nextYear.push(
      ...this.getPreviewWeeklyPlansData(weeklyPlans[1])
    );

    const options = {
      thisYear: {
        pagination: false,
        showColumns: false,
        search: false,
        showToggle: false,
        columns: this.columnPreview.thisYear
      },
      nextYear: {
        pagination: false,
        showColumns: false,
        search: false,
        showToggle: false,
        columns: this.columnPreview.nextYear
      }
    };
    this.context.tablePreviewThisYear.__table(
      "refreshOptions",
      options.thisYear
    );
    this.context.tablePreviewNextYear.__table(
      "refreshOptions",
      options.nextYear
    );
  }

  getPreviewWeeklyPlanColumns(weeklyPlan) {
    const columns = [
      { title: "Tahun", field: "Year" },
      { title: "Unit", field: "UnitCode" }
    ];

    weeklyPlan.Items.sort((a, b) => {
      return a.WeekNumber - b.WeekNumber;
    });

    for (const item of weeklyPlan.Items) {
      columns.push({
        title: `W${item.WeekNumber} ${moment(item.EndDate).format("DD MMM")}`,
        field: `Week${item.WeekNumber}`
      });
    }
    return columns;
  }

  getPreviewWeeklyPlansData(weeklyPlans) {
    let previewData = [];
    for (const weeklyPlan of weeklyPlans) {
      const data = {
        Year: weeklyPlan.Year,
        UnitCode: weeklyPlan.UnitCode
      };
      for (const item of weeklyPlan.Items)
        data[`Week${item.WeekNumber}`] = item.RemainingEh;
      previewData.push(data);
    }
    
    return previewData;
  }
}
