import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var ItemLoader = require('../../loader/finished-goods-loader');

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    @bindable item;
    @bindable barcode
  //  sources = [];
    //destinations = [];

    destinations = [];
    destination = {};
    sources =[];
    source = {};
    //sourc =[];
    item;
    barcode;
    qtyFg;
    price;
    firstPrice = 0;
    indexSource = 0;
    hasFocus = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
        

        
        

        // this.service.getSources()
        // .then(result => {
        //     this.sources = result.data;
        //     if (this.sources.length > 0)
        //         this.source = this.sources[0];
        //     this.sources.forEach((s) => {
        //         s.toString = function () {
        //             return s.name;
        //         }
        //     });
        // });
        //console.log(this.data)
  
    }
    sumTotalQty;
    sumPrice;

    get itemLoader() {
      return ItemLoader;
    }
    

    // getStorage(config) {
    //     return new Promise((resolve, reject) => {
    //         var getStorages = [];
    //         if (config.source.type && config.source.type == "selection") {
    //             for (var sourceId of config.source.value) {
    //                 getStorages.push(this.service.getStorageById(sourceId.toString()));
    //                 this.indexSource++;
    //             }
    //         }
    //         else {
    //             if (config.source.value) {
    //                 getStorages.push(this.service.getStorageById(config.source.value.toString()));
    //                 this.indexSource++
    //             }
    //         }
    //         var getStoragesDestination = [];
    //         if (config.destination.type && config.destination.type == "selection") {
    //             for (var destinationId of config.destination.value) {
    //                 getStorages.push(this.service.getStorageById(destinationId.toString()));
    //             }
    //         }
    //         else {
    //             if (config.destination.value) {
    //                 getStorages.push(this.service.getStorageById(config.destination.value.toString()));
    //             }
    //         }
    //         resolve(Promise.all(getStorages));
    //     })

    // }

    async attached() {
        if (this.data.items != undefined) {
            this.makeTotal(this.data.items);
        } else {
            this.sumTotalQty = 0;
            this.sumPrice = 0;
        }
        var storages = await this.service.getModuleConfig()
        
          this.service.getDestinations()
            .then(result => {
                this.destinations = result.data;
                this.destinations.forEach((s) => {
                  s.toString = function () {
                      return s.name;
                  }
                  });
            })
         this.service.getSources()
           .then(result => {
               this.sources = result.data;
               this.sources.forEach((s) => {
                 s.toString = function () {
                   return s.name;
                 }
               });
           })

        this.destinations = this.destinations.map(destination => {
          destination.toString = function () {
            return name;
          }
          return destination;
        })
        this.sources = this.sources.map(source => {
          source.toString = function () {
            return name;
          }
          return source;
        })
        //console.log(this.destination)
    }
    // async barcodeChoose(e) {
    //     // var itemData= e.target.value;
    //     // var sources = this.source;

    //     let args = {
    //         itemData : e.target.value,
    //         source: this.destination._id,
            


    //     };
    //     return this.service.getByCode(args)
    //       .then(result => {
    //         if (result.data.length > 0) {
    //           this.datas = result.data;
    //           console.log(this.data);
    //           newItem.item = this.datas.item;
    //           newItem.itemInternationalCOGS = this.datas.itemInternationalCOGS;
    //           newItem.itemInternationalRetail = this.datas.itemInternationalRetail;
    //           newItem.itemInternationalSale = this.datas.itemInternationalSale;
    //           newItem.itemInternationalWholeSale = this.datas.itemInternationalWholeSale;
    //           newItem.quantity = this.datas.quantity;
    //           this.data.items.push(newItem)
    //         } else {
    //           alert("Stock Inventory Kosong")
    //         }
    //         //   console.log(result);
    //         //   var datas=[];
    //         // for (var _data of result.data) {


    //         //     datas.push(_data);
    //         // }
    //      //   console.log(data);
    //       //  this.datas= result.data;
    //       //   console.log(this.data);
    //         this.makeTotal(this.data.items);
    //       }) 

    // }
    barcodeChanged(newValue, oldValue) {
      if(newValue){
        var _data = this.data.items.find((item) => item.code === selectedSupplier.code);
        console.log(_data)
        if(!_data){
          let args = {
            itemData: newValue,
            source: this.data.source._id
          };
           this.service.getByCode(args).then(result => {
             //var datas = result;
             this.sumTotalQty = 0;
             this.sumPrice = 0;
             if (result.length > 0) {
               for (var datas of result) {
                 this.data.items.push({
                   item: datas.item,
                   itemInternationalCOGS: datas.itemInternationalCOGS,
                   itemInternationalRetail: datas.itemInternationalRetail,
                   itemInternationalSale: datas.itemInternationalSale,
                   itemInternationalWholeSale: datas.itemInternationalWholeSale,
                   quantity: datas.quantity
                 })
                 this.sumTotalQty = this.sumTotalQty + parseInt(datas.quantity);
                 this.sumPrice += datas.item.domesticCOGS;
               }

             } else {
               alert("Stock Inventory Kosong")
             }
           })
        }

      } else {
        //this.data.supplier = {};
        //this.data.items = [];
        //this.data.supplierId = undefined;
      }
      this.makeTotal(this.data.items);
      
    }
    itemView = (item) => {
      if (!item.Code)
        return `${item.name}`
      else
        return `${item.name}`
    }
    itemChanged(newValue, oldValue) {
         var selectedSupplier = newValue;
         //console.log(newValue)
         if (selectedSupplier) {
           var _data = this.data.items.find((item) => item.code === selectedSupplier.code);
                if (!_data) {
                  //console.log(selectedSupplier.name)
                  this.sumTotalQty = 0;
                  this.sumPrice = 0;
                  let args = {
                    source: this.data.source._id,
                    itemData: selectedSupplier.name,
                  };
                      this.service.getByName(args).then(result => {
                        //var datas = result;
                        if(result.length > 0 ){
                        for(var datas of result){
                          this.data.items.push({
                            item: datas.item,
                            itemInternationalCOGS: datas.itemInternationalCOGS,
                            itemInternationalRetail: datas.itemInternationalRetail,
                            itemInternationalSale: datas.itemInternationalSale,
                            itemInternationalWholeSale: datas.itemInternationalWholeSale,
                            quantity: datas.quantity
                          })
                         this.sumTotalQty = this.sumTotalQty + parseInt(datas.quantity);
                         this.sumPrice += datas.item.domesticCOGS;
                        }
                      }else{
                        alert("Stock Inventory Kosong")
                      }
                      })
                      this.makeTotal(this.data.items);
                }

         } else {
           //this.data.supplier = {};
           this.data.items = [];
           //this.data.supplierId = undefined;
         }
         
    }
    // async nameChoose(e) {
    //   this.hasFocus = false;
    //   var itemData = e.detail;
    //   if (itemData != undefined) {
    //     if (Object.getOwnPropertyNames(itemData).length > 0) {
    //       var newItem = {};
    //       var _data = this.data.items.find((item) => item.code === itemData.code);
    //       if (!_data) {
    //         let args = {
    //           source: this.data.destination._id,
    //           itemData: itemData.name,
    //         };
    //         var datas = await this.service.getByName(args);
    //         newItem.item = datas.item;
    //         newItem.itemInternationalCOGS = datas.itemInternationalCOGS;
    //         newItem.itemInternationalRetail = datas.itemInternationalRetail;
    //         newItem.itemInternationalSale = datas.itemInternationalSale;
    //         newItem.itemInternationalWholeSale = datas.itemInternationalWholeSale;
    //         newItem.quantity = datas.quantity;
    //         this.data.items.push(newItem)
    //         // this.qtyFg = 0;
    //         // this.price = 0;
    //         // newItem.itemId = itemData._id;
    //         // newItem.item = itemData;
    //         // newItem.availableQuantity = 0;
    //         // var result = await this.service.getDataInventory(this.data.source._id, newItem.itemId);
    //         // if (result != undefined) {
    //         //   newItem.availableQuantity = result.quantity;
    //         // }
    //         // newItem.name = itemData.name;
    //         // newItem.code = itemData.code;
    //         // newItem.quantity = 1;
    //         // this.qtyFg = this.qtyFg + 1;
    //         // this.price = itemData.domesticSale;
    //         // newItem.price = parseFloat(itemData.domesticSale);
    //         // newItem.remark = "";
    //         // this.data.items.push(newItem);
    //       }
    //       this.makeTotal(this.data.items);
    //       this.item = null;
    //     }
    //   }

    // }
    // async barcodeChoose(e) {
    //     var itemData = e.target.value;
    //     console.log(itemData.length);
    //     this.price = 0;
    //     if (itemData && itemData.length >= 13) {
    //         var fgTemp = await this.service.getByCode(itemData);
    //         console.log(this.data);
    //         if (fgTemp != undefined) {
    //             if (Object.getOwnPropertyNames(fgTemp).length > 0) {
    //                 var fg = fgTemp[0];
    //                 this.price = fg.domesticSale;
    //                 if (fg != undefined && Object.getOwnPropertyNames(fg).length > 0) {
    //                     var newItem = {};
                        
    //                     var _data = this.data.items.find((item) => item.code === fg.code);
    //                     if (!_data) {
    //                         this.qtyFg = 0;
    //                         this.price = 0;
    //                         newItem.itemId = fg._id;
    //                         newItem.item = fg;
    //                         newItem.availableQuantity = 0;
    //                         var result = await this.service.getDataInventory(this.data.sumber.UId, newItem.itemId);
    //                         if (result != undefined) {
    //                             newItem.availableQuantity = result.quantity;
    //                         }
    //                         newItem.name = fg.name;
    //                         newItem.code = fg.code;
    //                         this.qtyFg = this.qtyFg + 1;
    //                         newItem.quantity = 1;
    //                         newItem.price = parseFloat(fg.domesticSale)
    //                         newItem.remark = "";
    //                         this.data.items.push(newItem);
    //                     } else {
    //                         this.firstPrice = 0;
    //                         this.qtyFg = parseInt(_data.quantity) + 1;
    //                         this.firstPrice = this.qtyFg * this.price
    //                         _data.price = parseFloat(this.firstPrice)
    //                         _data.quantity = this.qtyFg;
    //                     }
    //                 }
    //             }
    //         }
    //         this.makeTotal(this.data.items);
    //         this.barcode = "";
    //     }

    // }

   

    // async nameChoose(e) {
    //     this.hasFocus = false;
    //     var itemData = e.detail;
    //     if (itemData != undefined) {
    //         if (Object.getOwnPropertyNames(itemData).length > 0) {
    //             var newItem = {};
    //             var _data = this.data.items.find((item) => item.code === itemData.code);
    //             if (!_data) {
    //                 this.qtyFg = 0;
    //                 this.price = 0;
    //                 newItem.itemId = itemData._id;
    //                 newItem.item = itemData;
    //                 newItem.availableQuantity = 0;
    //                 var result = await this.service.getDataInventory(this.data.sources._id, newItem.itemId);
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
    //             this.makeTotal(this.data.items);
    //             this.item = null;
    //         }
    //     }

    // }

    async qtyChange(code, qty, price) {
        var barcode = code;
        var quantity = qty;
        this.price = 0;
        if (quantity != undefined) {
            // var fgTemp = await this.service.getByCode(code);
            // var fg = fgTemp[0];
            // this.price = fg.domesticSale;
            // var newItem = {};
            var _data = this.data.items.find((item) => item.item.Code === barcode);
            if (_data) {
                this.price = parseInt(_data.sendquantity) * this.price
                _data.price = parseFloat(this.price);
            }
        }
        this.makeTotal(this.data.items);
    }

    makeTotal(items) {
        this.sumTotalQty = 0;
        this.sumPrice = 0;
        if (Object.getOwnPropertyNames(items).length > 0) {
            for (var i = 0; i < items.length; i++) {
                console.log(items[i].item.domesticCOGS);
                this.sumTotalQty = this.sumTotalQty + parseInt(items[i].sendquantity);
                this.sumPrice += items[i].item.domesticCOGS;
            }
        } 
    }

    addItem() {
        var item = {};
        item.articleVariantId = '';
        this.data.items.push(item);
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
        this.makeTotal(this.data.items);
    }

    map(result) {
        return result.data.map(item => {
            return {
                _id: item.articleVariantId,
                name: item.articleVariant.name,
                articleVariant: item.articleVariant
            }
        });
    }


    // sourceChange(e) {
    //     var sourceName = e.srcElement.value;
    //     var nama = sourceName.split("(");
    //     this.service.getSource(nama[0])
    //         .then(storage => {
    //             this.data.source._id = storage[0]._id;
    //             this.data.source = storage[0];
    //             this.data.items = [];
    //             this.sumTotalQty = 0;
    //             this.sumPrice = 0;
    //             var sourcesTemp = this.sources;
    //             this.sources = [];
    //             var index = 0;
    //             for (var source of sourcesTemp) {
    //                 if (source.name === storage[0].name) {
    //                     this.sources.splice(0, 0, source);
    //                 } else {
    //                     index = index + 1;
    //                     this.sources.splice(index, 0, source);
    //                 }
    //             }
    //             this.sources = this.sources.map(source => {
    //                 source.toString = function () {
    //                     return this.name;
    //                 }
    //                 return source;
    //             })
    //         })
    // }
}


