import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../au-components/dialog/dialog';
import { StockInStorageDialog } from './dialogs/stock-in-storage-dialog';

@inject(Router, Service, Dialog)
export class Report {
    @bindable yearMonthsData;
    detail = ['Detail'];
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
                return result;
            })
        if (yearMonthsList) {
            yearMonthsList.forEach(yearMonth => {
                this.yearMonths.push(yearMonth)
            })
        }
    }

    yearMonthsDataChanged(newValue, oldValue){
        this.months = this.yearMonthsData.months;
    }

    showMonthlyOverallStock() {
        let month = this.data.month.id;
        let year = this.yearMonthsData.year;
        this.service.getMonthlyOverallStock(month, year)
            .then(results => {
                results.forEach(item => {
                    this.tableData.push(item);
                })
                this.usedMonth = month;
                this.usedYear = year;
                this.models.refresh();
            })
            .then(() => {
                this.tableData = [];
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
        }
    }

    checkStockInStorage(data) {
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