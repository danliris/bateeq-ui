import { bindable, inject, computedFrom } from "aurelia-framework";


export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable uploadDate;

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.checkAll = false;

        if (this.readOnly) {
            this.itemsColumns = [
                { header: "Barcode", value: "code" },
                { header: "Nama Barang", value: "item.name" },
                { header: "Kuantitas Stock Sebelum SO", value: "qtyBeforeSO" },
                { header: "Kuantitas SO", value: "qtySO" },
                { header: "Selisih", value: "qtySO - qtyBeforeSO" },
                { header: "catatan", value: "remark" },
                { header: "Sesuaikan Dengan SO", value: "isAdjusted" }
            ];
        }
    }

    itemsColumns = [
        { header: "Barcode", value: "code" },
        { header: "Nama Barang", value: "item.name" },
        { header: "Kuantitas Stock Sebelum SO", value: "qtyBeforeSO" },
        { header: "Kuantitas SO", value: "qtySO" },
        { header: "Selisih", value: "qtySO - qtyBeforeSO" },
        { header: "catatan", value: "remark" },
        { header: "Sesuaikan Dengan SO", value: "isAdjusted" },
        { header: "", value: "__check" }
    ]

    get status() {
        return this.data.isProcessed ? "Sudah Diproses" : "Belum Diproses";
    }

    checkAllCallBack($event) {
        var e = $event;
        if (this.checkAll == false && e.path.length == 19) {
            var changeElement = this.data.items.map(element => {
                if (element.isEdit == true) {
                    element.isAdjusted = true;
                    element.remark = element.CreatedUtc;
                }
                this.checkAll = true;
                return element;
            });
            this.data.items = changeElement;
        }
        else {
            if (e.path.length == 19) {
                var changeElement = this.data.items.map(element => {
                    if (element.isEdit == true) {
                        element.isAdjusted = false;
                        element.remark = '';
                    }
                    this.checkAll = false;
                    return element;
                });
                this.data.items = changeElement;
            }
        }
    }


}