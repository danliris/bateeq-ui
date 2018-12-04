import { inject, bindable, computedFrom } from "aurelia-framework";
import { Router } from "aurelia-router";
import moment from "moment";
import { Dialog } from '../../../components/dialog/dialog';
import { Service } from "./service";
import { ROSizeBreakdownFooter } from "../../merchandiser/ro-retail/template/ro-retail-sizebreakdown-footer";
const bookingOrderLoader = require("../../../loader/booking-order-loader");

@inject(Router, Dialog, Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data = {};
  @bindable error = {};
  @bindable isHasRo;

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  };

  constructor(router, dialog, service) {
    this.router = router;
    this.dialog = dialog;
    this.service = service;
    this.isHasRo = true;
  }

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
      if (this.data.WorkSchedules.length == 0) {
        this.dialog.confirmRO("Tambah data jadwal Pengerjaan?", "TAMBAH DATA")
          .then(response => {
            if (response == 'ok') {
              this.isHasRo = true;
              this.workSchedules_Info.options.isHasRo = this.isHasRo;
            }
            else {
              this.isHasRo = false;
              this.workSchedules_Info.options.isHasRo = this.isHasRo;
            } 
            var workSchedule = {
             
            };
            if (this.isHasRo){
              workSchedule = {
                isHasRoViewing :true
              };
              this.data.WorkSchedules.push(workSchedule);
                    
            }
            else{
               workSchedule = {
                isHasRoViewing :false
              };
              this.data.WorkSchedules.push(workSchedule);
            }
                 
          })
      }
      else {
        var countError = 0;
        this.data.WorkSchedules.forEach(element => {
          if (element.Week == null) {
            countError++;
          }
        });

        if (countError > 0) {
          this.dialog.prompt("Data Jadwal pengerjaan belum lengkap, Lengkapi data terlebih dahulu ! ", "KONFIRMASI KELENGKEPAN DATA")
            .then(response => {
              if (response == 'ok') { }
            })

        }
        else {
          this.dialog.confirmRO("Tambah data jadwal Pengerjaan?", "TAMBAH DATA")
            .then(response => {
              if (response == 'ok') {
                this.isHasRo = true;
                this.workSchedules_Info.options.isHasRo = this.isHasRo;
              }
              else {
                this.isHasRo = false;
                this.workSchedules_Info.options.isHasRo = this.isHasRo;
              }

              var workSchedule = {
             
              };
                if (this.isHasRo){
                   workSchedule = {
                    isHasRoViewing :true
                  };
                  this.data.WorkSchedules.push(workSchedule); 

                }
                else{
                   workSchedule = {
                    isHasRoViewing :false
                  };
                  this.data.WorkSchedules.push(workSchedule); 
                } 
               
            }
          )
        }
      }
    }.bind(this), options: { readOnly: this.readOnly }
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

  filterBookingOrder = {
    Expired: ""
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
    this.service = this.context.service;
    this.data = this.context.data;
    this.error = this.context.error;
    this.workSchedules_Info.options.readOnly = this.readOnly;
    this.workSchedules_Info.options.isHasRo = this.isHasRo;
    if ((this.readOnly || this.isEdit) && this.data) {
      this.selectedBookingOrder = this.data.BookingOrder;
}
    const getYear = new Date().getFullYear();
    const getWeeklyPlanPromise = {
      thisYear: this.service.getWeeklyPlanByYear(getYear.toString()),
      nextYear: this.service.getWeeklyPlanByYear((getYear + 1).toString())
    };

    const weeklyPlans = await Promise.all([
      getWeeklyPlanPromise.thisYear,
      getWeeklyPlanPromise.nextYear
    ]);


    if (weeklyPlans[0].length > 0) {
      this.columnPreview.thisYear.push(
        ...this.getPreviewWeeklyPlanColumns(weeklyPlans[0][0])
      );
      this.weeklyPlansPreview.thisYear.push(

        ...this.getPreviewWeeklyPlansData(weeklyPlans[0])
      );
    }

    if (weeklyPlans[1].length > 0) {
      this.columnPreview.nextYear.push(
        ...this.getPreviewWeeklyPlanColumns(weeklyPlans[1][0])
      );

      this.weeklyPlansPreview.nextYear.push(
        ...this.getPreviewWeeklyPlansData(weeklyPlans[1])
      );
    }

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

  getIsWorkScheduleReadOnly(){

  }
};
