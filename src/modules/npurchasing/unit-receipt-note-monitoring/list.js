import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../loader/nunit-loader');
var PRLoader = require('../../../loader/npurchase-request-all-loader');
var URNLoader = require('../../../loader/nunit-receipt-note-all-loader');
var CategoryLoader = require('../../../loader/ncategory-loader');
var SupplierLoader = require('../../../loader/nsupplier-loader');

@inject(Router, Service)
export class List {
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    columns = [
        { field: "index", title: "No" , sortable: false},
        { field: "unit", title: "Unit" , sortable: false },
        { field: "category", title: "Kategori", sortable: false },
        { field: "prNo", title: "Nomor PR" , sortable: false},
        { field: "productName", title: "Nama Barang", sortable: false },
        { field: "productCode", title: "Kode Barang", sortable: false },
        { field: "supplier", title: "Supplier" , sortable: false},
        { field: "receiptDate", title: "Tanggal Bon Terima", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "urnNo", title: "Nomor Bon Terima" , sortable: false},
        { field: "dealQuantity", title: "Jumlah Beli", sortable: false,formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },
        { field: "DealUom", title: "Satuan Beli", sortable: false },
        { field: "receiptQuantity", title: "Jumlah Terima", sortable: false,formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },
        { field: "receiptUom", title: "Satuan Terima", sortable: false },
        { field: "quantity", title: "Jumlah (+/-/0)", sortable: false,formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },
        { field: "price", title: "Harga per Unit", sortable: false },
        { field: "DealPrice", title: "Total", sortable: false }, 
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    search() {
        this.error = {};


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.prTable.refresh();
        }
    }

    reset() {
        this.pr=null;
        this.unit = null;
        this.category = null;
        this.unitReceiptNote = null;
        this.supplier = null;
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.error = {};

        this.flag = false;
        //this.prTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            urnNo:this.unitReceiptNote? this.unitReceiptNote.no:"",
            prNo: this.pr ? this.pr.no : "",
            unitId: this.unit ? this.unit.Id : "",
            categoryId: this.category ? this.category._id : "",
            supplierId: this.supplier ? this.supplier._id : "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",

        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        var index=0;
                        for(var a of result.data){
                            index++;
                            a.index=index;
                        }
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }

    xls() {
        this.error = {};
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let args = {
            urnNo:this.unitReceiptNote? this.unitReceiptNote.no:"",
            prNo: this.pr ? this.pr.no : "",
            unitId: this.unit ? this.unit.Id : "",
            categoryId: this.category ? this.category._id : "",
            supplierId: this.supplier ? this.supplier._id : "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",

        };

            this.service.generateExcel(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    get prLoader() {
        return PRLoader;
    }
    
    get categoryLoader() {
        return CategoryLoader;
    }
    
    get supplierLoader() {
        return SupplierLoader;
    }

    get urnLoader() {
        return URNLoader;
    }

    prView = (tr) => {
      return `${tr.no}`;
    }
    urnView = (urn) => {
        return `${urn.no}`;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}
