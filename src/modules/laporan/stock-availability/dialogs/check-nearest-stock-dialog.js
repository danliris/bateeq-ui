import { inject, Lazy } from 'aurelia-framework';
import { Service } from '.././service';
import { DialogController } from 'aurelia-dialog';

@inject(Service, DialogController)
export class FabricGradeTestEditor {

    data = {};
    dialogTableData = [];

    constructor(service, dialogController) {
        this.service = service;
        this.dialogController = dialogController;
    }

    activate(data, context) {
        this.context = context;
        this.data = data;
        this.showTable(data);
    }

    dialogTableOptions = {
        columns: [],
        search: false,
        showColumns: false,
        showToggle: false
    };

    showTable(result) {
        let tableHeader = [{ field: 'storage.code', title: 'Kode Penyimpanan'}, { field: 'storage.name', title: "Name Penyimpanan"},
        { field: 'city', title: 'Kota' }, { field: 'latestDate', title: 'Tanggal' }, { field: 'quantity', title: 'Kuantitas' }]
        this.dialogTableOptions.columns = [];
        for (let header of tableHeader) {
            this.dialogTableOptions.columns.push(header);
        }
        this.dialogTableData = [];
        for (let inventory of result) {
            this.dialogTableData.push(inventory);
        }
    }

}   