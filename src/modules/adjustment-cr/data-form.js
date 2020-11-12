import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var SourceLoader = require('../../loader/nstorage-loader');

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    Type = ["","IN", "OUT"];
    hasFocus = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }


    async attached() {
        this.sumTotalQty = 0;
        this.sumPrice = 0;
        // var storages = await this.service.getStorage();
        // this.sources = storages;
        // this.sources = this.sources.map(source => {
        //     source.toString = function () {
        //         return this.name;
        //     }
        //     return source;
        // })
    }

    get sourceLoader() {
        return SourceLoader;
    }

    sourceChange(e) {
        this.data.items = [];
        if (this.data.storage && this.data.storage._id)
            this.data.storage = this.data.storage;
        else
            this.data.storage = null;
    }

    get hasSource() {
        return this.data && this.data.storage != null && this.data.storage._id !== '';
    }

    async barcodeChoose(e) {
        var itemData = e.target.value;
        if (itemData && itemData.length >= 13) {
            var fgTemp = await this.service.getByCode(itemData);
            console.log(fgTemp);
            if (fgTemp != undefined) {
                if (Object.getOwnPropertyNames(fgTemp).length > 0) {
                    var fg = fgTemp[0];
                    let args = {
                        itemData: fg._id,
                        source: this.data.storage._id
                    };
                    if (fg != undefined && Object.getOwnPropertyNames(fg).length > 0) {
                        var newItem = {};
                        var _data = this.data.items.find((item) => item.code === fg.code);
                        if (!_data) {
                            var item = {}
                            this.qtyFg = 0;
                            this.price = 0;
                            item._id = fg._id;
                            item.name = fg.name;
                            item.code = fg.code;
                            item.uom = fg.Uom;
                            item.size = fg.Size;
                            item.articleRealizationOrder = fg.ArticleRealizationOrder;
                            item.domesticCOGS = parseFloat(fg.DomesticCOGS);
                            item.domesticSale = parseFloat(fg.DomesticSale);
                            item.domesticRetail = parseFloat(fg.DomesticRetail);
                            item.domesticWholesale = parseFloat(fg.DomesticWholesale);
                            newItem.item = item;
                            var result = await this.service.getDataInventory(args);
                            if (result != undefined || result.length > 0 ){
                                newItem.qtyBeforeAdjustment = result.quantity;
                            } else {
                                alert("Barang tidak ada di inventory")
                                newItem.qtyBeforeAdjustment = 0;
                            }
                            console.log(result)
                            newItem.qtyAdjustment = 0;
                            newItem.remark = "";
                            this.data.items.push(newItem);
                            console.log(this.data)
                        } else {
                            alert("Barang sudah ada di list")
                            // this.firstPrice = 0;
                            // this.qtyFg = parseInt(_data.quantity) + 1;
                            // this.firstPrice = this.qtyFg * this.price
                            // _data.price = parseFloat(this.firstPrice)
                            // _data.quantity = this.qtyFg;
                        }
                    }
                }
            }
            this.barcode = "";
        }
    }    

    // async nameChoose(e) {
    //     this.hasFocus = false;
    //     var itemData = e.detail;
    //     if (itemData && itemData.code && itemData.code !== "") {
    //         if (Object.getOwnPropertyNames(itemData).length > 0) {
    //             var newItem = {};
    //             var _data = this.data.items.find((item) => item.code === itemData.code);
    //             if (!_data) {
    //                 this.qtyFg = 0;
    //                 this.price = 0;
    //                 newItem.itemId = itemData._id;
    //                 newItem.availableQuantity = 0;
    //                 var result = await this.service.getDataInventory(this.data.source._id, newItem.itemId);
    //                 if (result != undefined) {
    //                     newItem.availableQuantity = result.quantity;
    //                 }
    //                 newItem.name = itemData.name;
    //                 newItem.code = itemData.code;
    //                 newItem.quantity = 1;
    //                 this.qtyFg = this.qtyFg + 1;
    //                 this.price = itemData.domesticSale;
    //                 newItem.price = parseFloat(itemData.domesticSale);
    //                 newItem.remark = "";
    //                 this.data.items.push(newItem);
    //             }
    //             this.item = null;
    //         }
    //     }
    // }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    typeChanged(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items[itemIndex].type == item.type;            

        console.log(this.data.items[itemIndex].type)
    }

    QtyChanged(item) {
        var itemIndex = this.data.items.indexOf(item);
        //this.data.items[itemIndex].Qty = this.data.items[itemIndex].availableQuantity + this.data.items[itemIndex].inQty;
        
        // if (this.data.items[itemIndex].outQty && this.data.items[itemIndex].outQty > 0) {
        //     this.data.items[itemIndex].Qty = this.data.items[itemIndex].Qty - this.data.items[itemIndex].outQty;
        // }
        if (this.data.items[itemIndex].type == "IN") {
            this.data.items[itemIndex].Qty = this.data.items[itemIndex].qtyBeforeAdjustment + this.data.items[itemIndex].qtyAdjustment;
        }
        else{
            this.data.items[itemIndex].Qty = this.data.items[itemIndex].qtyBeforeAdjustment - this.data.items[itemIndex].qtyAdjustment;
        }

        console.log(this.data)
    }
    // inQtyChanged(item) {
    //     var itemIndex = this.data.items.indexOf(item);
    //     this.data.items[itemIndex].Qty = this.data.items[itemIndex].availableQuantity + this.data.items[itemIndex].inQty;
    //     if (this.data.items[itemIndex].outQty && this.data.items[itemIndex].outQty > 0) {
    //         this.data.items[itemIndex].Qty = this.data.items[itemIndex].Qty - this.data.items[itemIndex].outQty;
    //     }
    // }
    // outQtyChanged(item) {
    //     var itemIndex = this.data.items.indexOf(item);
    //     this.data.items[itemIndex].Qty = this.data.items[itemIndex].availableQuantity - this.data.items[itemIndex].outQty;
    //     if (this.data.items[itemIndex].inQty && this.data.items[itemIndex].inQty > 0) {
    //         this.data.items[itemIndex].Qty = this.data.items[itemIndex].Qty + this.data.items[itemIndex].inQty;
    //     }
    // }
}
