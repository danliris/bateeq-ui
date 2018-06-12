import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";
var moment = require('moment');
var UnitLoader = require('../../../loader/unit-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedUnit;

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.itemColumns = [
            { header: "Minggu ke-", value: "WeekNumber" },
            { header: "Tanggal Mulai", value: "StartDate" },
            { header: "Tanggal Selesai", value: "EndDate" },
            { header: "Bulan", value: "MonthName" },
            { header: "Efisiensi %", value: "Efficiency" },
            { header: "Total Operator", value: "Operator" },
            { header: "Working Hours", value: "WorkingHours" },
            { header: "Total AH", value: "AhTotal" },
            { header: "Total EH", value: "EhTotal" },
            { header: "Used EH", value: "UsedEH" },
            { header: "Remaining EH", value: "RemainingEH" },
        ];

        if (this.data && this.data.Id && this.data.UnitId) {
            this.data.Items.forEach(item => {
                item["MonthName"] = this.getMonthName(item.Month);
            });

            var unit = {
                _id : this.data.UnitId,
                name : this.data.UnitName,
                code : this.data.UnitCode
            }
            this.selectedUnit = unit;
            this.yearSelected = this.data.Year;
        }
    }

    // yearColumns = [] 

    get isYear() {
        var current_year = (new Date()).getFullYear() + 10;
        var last_year = (new Date()).getFullYear() - 10;
        return this.data && this.data.Year && this.data.Year >= last_year && this.data.Year <= current_year;
    }

    getMonthName(month) {
        var monthName = '';
        switch (month) {
            case 0:
                monthName = "Januari";
                break;
            case 1:
                monthName = "Februari";
                break;
            case 2:
                monthName = "Maret";
                break;
            case 3:
                monthName = "April";
                break;
            case 4:
                monthName = "Mei";
                break;
            case 5:
                monthName = "Juni";
                break;
            case 6:
                monthName = "Juli";
                break;
            case 7:
                monthName = "Agustus";
                break;
            case 8:
                monthName = "September";
                break;
            case 9:
                monthName = "Oktober";
                break;
            case 10:
                monthName = "November";
                break;
            case 11:
                monthName = "Desember";
                break;
        }
        return monthName;
    }

    yearSelected = 0;
    get dataDetail() {
        this.data.Items = this.data.Items || [];

        // batas maksimal tahun
        var max_year = (new Date()).getFullYear() + 10;
        // batas minimal tahun
        var min_year = (new Date()).getFullYear() - 10;

        if (this.data && this.data.Year && this.data.Year > 0 && this.data.Year >= min_year && this.data.Year <= max_year) {

            // hapus error jikan ada error out of range year sebellum di submit
            if (this.error)
                this.error.Year = null;

            if (this.yearSelected !== this.data.Year) {
                this.yearSelected = this.data.Year;
                if (this.data && this.data.Items && this.data.Items.length > 0) {
                    var count = this.data.Items.length;
                    for (var a = count; a >= 0; a--) {
                        this.data.Items.splice((a - 1), 1);
                    }
                }

                var startDateOfYear = new Date(`${this.data.Year}-01-01`);
                var endDateOfYear = new Date(`${this.data.Year}-12-31`);
                var isSameYear = (moment().year(this.data.Year).day("Monday").week(1).toDate()).getFullYear() === this.data.Year ? true : false;
                var totalWeek = Math.ceil((((endDateOfYear - startDateOfYear) / 86400000) + 1) / 7);
                // if(!isSameYear)
                //     totalWeek -= 1;
                for (var i = 1; i <= totalWeek; i++) {
                    //var startDate = moment().year(this.data.year).day("Monday").week(isSameYear ? i : (i+1)).toDate();
                    /// var endDate = moment().year(this.data.year).day("Friday").week(isSameYear ? i : (i+1)).toDate();

                    var startDate = i == 1 ? new Date(`${this.data.Year}-01-01`) : moment().year(this.data.Year).day("Monday").week((i)).toDate();
                    var endDate = i == totalWeek ? new Date(`${this.data.Year}-12-31`) : moment().year(this.data.Year).day("Saturday").week((i)).toDate();
                    this.data.Items.push({
                        WeekNumber: i,
                        StartDate: startDate,
                        EndDate: endDate,
                        Month: startDate.getMonth(),
                        MonthName: this.getMonthName(startDate.getMonth()),
                        Efficiency: 0,
                        Operator: 0,
                        WorkingHours: 0,
                        AhTotal: 0,
                        EhTotal: 0,
                        UsedEh: 0,
                        RemainingEh: 0,
                    })
                }
            }
        } else {
            this.yearSelected = 0;
            if (this.data && this.data.Year && this.data.Year < min_year) {
                this.error.year = "Year is out of range year";
            }
            if (this.data && this.data.Year && this.data.Year > max_year) {
                this.error.year = "Year is out of range year";
            }
            if (this.data && this.data.Items && this.data.Items.length > 0) {
                var count = this.data.Items.length;
                for (var a = count; a >= 0; a--) {
                    this.data.Items.splice((a - 1), 1);
                }
            }
        }
        return this.data.Items;
    }

    selectedUnitChanged(newValue) {
        if (newValue) {
            this.data.UnitId = newValue._id;
            this.data.UnitCode = newValue.code;
            this.data.UnitName = newValue.name;
        }
        else {
            this.data.UnitId = null;
        }
    }

    unitView = (unit) => {
        return `${unit.code} - ${unit.name}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    onitemchange(event) {
        var tdPath = 4; // td index in $event.path
        var trPath = 5; // tr index in $event.path
        var column = event.path[tdPath].cellIndex; // index start from 0
        var columnName = this.itemColumns[column].value;
        var row = event.path[trPath].rowIndex; // start from 1

        for (var i = row; i < this.data.Items.length; i++) {
            this.data.Items[i][columnName] = Number(event.target.value);
        }
    }
}