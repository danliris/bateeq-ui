import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../au-components/dialog/dialog';
import { StockInStorageDialog } from './dialogs/stock-in-storage-dialog';

@inject(Router, Service, Dialog)
export class Report {
    @bindable yearMonthsData;
    detail = ['Detail', "Detail Excel"];
    yearMonths = [];
    months = [];
    tableData = [];
    usedMonth = {};
    usedYear = {};

    dropdownOptions = {
        label: {
            align: 'left',
            length: 1
        },
        control: {
            length: 2
        }
    }

    columns = [
        [{ title: 'Kode', rowspan: 2, valign: "middle", field: "code" }, { title: 'Toko', rowspan: 2, valign: "middle", field: "name" }, { title: 'Saldo Awal', colspan: 3 }, { title: 'Saldo Akhir', colspan: 3 }],
        [{ title: 'Kuantitas', field: "earliestQuantity" }, { title: 'HPP', field: "earliestHPP" }, { title: 'Harga Jual', field: "earliestSale" }, { title: 'Kuantitas', field: "latestQuantity" }, { title: 'HPP', field: "latestHPP" }, { title: 'Harga Jual', field: "latestSale" }]
    ]

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate() {
        let yearMonthsList = await this.service.getYearMonthsList()
            .then(result => {
                result.forEach(yearMonth => {
                    this.yearMonths.push(yearMonth)
                });
            });
    }

    convertToLocaleString(array) {
        for (var a of array) {
            for (var prop of Object.getOwnPropertyNames(a)) {
                a[prop] = a[prop].toLocaleString();
            }
        }
        return array;
    }

    yearMonthsDataChanged(newValue, oldValue) {
        this.months = this.yearMonthsData.months;
    }

    showMonthlyOverallStock() {
        this.tableData = [];
        let month = null;
        let year = null;

        if (this.data && this.yearMonths) {
            month = this.data.month.id;
            year = this.yearMonthsData.year;
        } else {
            month = new Date().getMonth() - 1;
            year = new Date().getFullYear();
            this.data = {};
            this.data.month = month;
        }

        this.service.getMonthlyOverallStock(month, year)
            .then(results => {
                results.forEach(item => {
                    this.tableData.push(item);
                })
                this.usedMonth = month;
                this.usedYear = year;
                this.models.refresh();
            })
            .catch(e => {
                this.error = e;
            })
    }

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case 'Detail':
                this.checkStockInStorage(data);
                break;
            case "Detail Excel":
                this.excelStockInStorage(data);
                break;    
        }
    }

    excelStockInStorage(data) {
        let code = data.code;
        let name = data.name;
        this.service.stockExcel(code, this.usedMonth, this.usedYear)    
    }

    checkStockInStorage(data) {
        console.log(data);
        let code = data.code;
        let name = data.name;
        this.service.getStockInStorage(code, this.usedMonth, this.usedYear).then(results => {
            let storageItems = {};
            storageItems.code = code;
            storageItems.name = name;
            storageItems.items = results;
            this.dialog.show(StockInStorageDialog, storageItems);
        })
    }
}
