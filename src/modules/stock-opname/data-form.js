import { bindable, inject, computedFrom } from "aurelia-framework";


export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable uploadDate;

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        
    }

    itemsColumns = [
        { header: "Barcode", value: "code" },
        { header: "Nama Barang", value: "item.name"},
        { header: "Kuantitas Stock Sebelum SO", value: "qtyBeforeSO" },
        { header: "Kuantitas SO", value: "qtySO" },
        { header: "Selisih", value: "qtySO - qtyBeforeSO" },
        { header: "Sesuaikan Dengan SO" , value: "isAdjusted"},
        { header: "catatan", value: "remark" }
    ]

    get status(){
        return this.data.isProcessed ? "Sudah Diproses" : "Belum Diproses";
    }

    get checkAllAdjusted(){
        var changeElement = this.data.items.map(element => {
            if (element.isEdit == true) {
                element.isAdjusted = true;
                element.remark = element._createdDate;
            } 
            return element;
        });
      
        this.data.items = changeElement;
    }

}