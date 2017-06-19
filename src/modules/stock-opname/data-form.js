import { bindable, inject, computedFrom } from "aurelia-framework";

var moment = require('moment');


export class DataForm {
    @bindable title;
    @bindable readOnly;

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }

    itemsColumns = [
        { header: "Barcode", value: "code" },
        { header: "Nama Barang", value: "item.name" },
        { header: "Kuantitas Stock Terakhir", value: "qtyBeforeSO" },
        { header: "Kuantitas SO", value: "qtySO" },
        { header: "Selisih", value: "qtySO - qtyBeforeSO" },
        { header: "Sesuaikan Dengan SO", value: "isAdjusted" },
        { header: "catatan", value: "remark" }
    ]

    get status(){
        return this.data.isProcessed ? "Sudah Diproses" : "Belum Diproses";
    }

}