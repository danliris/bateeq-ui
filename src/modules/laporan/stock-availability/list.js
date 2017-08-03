import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var StorageLoader = require('../../../loader/storage-loader');
import { Dialog } from '../../../au-components/dialog/dialog';
import { FabricGradeTestEditor } from './dialogs/check-nearest-stock-dialog';

@inject(Router, Service, Dialog)
export class List {

    detail = ['Cek penyimpanan terdekat'];
    visible = false;
    tableData = [];

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.storageId = "";
        this.inventoryId = "";
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
    }

    tableOptions = {
        columns: [],
        search: false,
        showColumns: false,
        showToggle: false
    };

    get storageLoader() {
        return StorageLoader;
    }

    showItem() {
        let input = this.data;
        if (typeof input === "undefined" || input === null) {
            this.error = "Masukkan kode inventory yang ingin anda cari";
        } else {
            this.error = "";
            this.storageId = input ? input._id : "";
            this.visible = true;
            this.service.getStorageInInventory(this.storageId)
                .then((result) => {
                    this.showTable(result);
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }

    showTable(result) {
        this.error = "";
        let tableHeader = [{ field: 'barcode', title: 'Barcode' }, { field: 'name', title: 'Nama' }, { field: 'quantity', title: 'Kuantitas' }]
        this.tableOptions.columns = [];
        for (let header of tableHeader) {
            this.tableOptions.columns.push(header);
        }
        this.tableData = [];
        for (let inventory of result) {
            inventory.barcode = inventory.item.code;
            inventory.name = inventory.item.name;
            inventory.quantity = inventory.quantity;
            this.tableData.push(inventory);
        }
        new Promise((resolve, reject) => {
            this.models.__table("refreshOptions", this.tableOptions);
            resolve();
        }).then(() => {
            this.models.refresh();
        });
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Cek penyimpanan terdekat":
                this.__checkNearestStockShowDialog(data);
            // {   
            //     // open new window
            //     let path = this.router.generate('view', {id: data._id});
            //     this.router.navigate('', window.open(path, '_blank', 'width=720,height=560'));
            // } 
        }
    }

    __checkNearestStockShowDialog(data) {
        this.error = "";
        this.inventoryId = data._id;
        this.service.getNearestStockInInventory(this.inventoryId).then(result => {
            this.dialog.show(FabricGradeTestEditor, result);
        })
    }

}
