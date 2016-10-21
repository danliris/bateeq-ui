import {inject, bindable, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
 
@inject(Router, Service, BindingEngine)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
        
    storeApiUri = require('../host').inventory + '/stores';
    variantApiUri = require('../host').core + '/articles/variants';
    voucherApiUri = '';
    
    constructor(router, service, bindingEngine) { 
        this.router = router;
        this.service = service;  
        this.bindingEngine = bindingEngine; 
        
        this.isCard = false;
        this.isCash = false;
        this.data.storeId = "";
        
        var getData = [];
        getData.push(this.service.getBank());
        getData.push(this.service.getCardType());
        getData.push(this.service.getPaymentType()); 
        Promise.all(getData)
            .then(results => { 
                this.Banks = results[0]; 
                this.CardTypes = results[1];
                this.PaymentTypes = results[2];
            })          
    }

    attached() {    
        this.data.discount = 0;
        this.data.totalProduct = 0;
        this.data.subTotal = 0;
        this.data.totalDiscount = 0;
        this.data.total = 0;
        this.data.grandTotal = 0;
        this.data.paymentDetail.voucherDiscount = 0; 
        this.data.paymentDetail.cashAmount = 0;
        this.data.paymentDetail.cardAmount = 0;
        this.data.paymentDetail.refund = 0;
        this.bindingEngine.collectionObserver(this.data.items)
            .subscribe(splices => {
                var item = this.data.items[splices[0].index];
                this.bindingEngine.propertyObserver(item, "articleVariantId").subscribe((newValue, oldValue) => {
                    item.price = parseInt(item.articleVariant.domesticSale);
                    this.sumRow(item);
                });
            });
    }  
    
    addItem() {           
        var item = {};
        item.articleVariantId = '';
        item.articleVariant = {};
        item.articleVariant.domesticSale = 0;
        item.quantity = 0;
        item.price = 0;
        item.discount1 = 0;
        item.discount2 = 0;
        item.specialDiscount = 0;
        item.margin = 0;
        item.total = 0;
        this.data.items.push(item); 
        this.sumRow(item);
    } 
    
    removeItem(item) { 
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
        this.sumTotal(); 
    }
    
    sumRow(item) {
        var itemIndex = this.data.items.indexOf(item);
        var itemDetail = this.data.items[itemIndex]
        itemDetail.total = (parseInt(itemDetail.quantity) * parseInt(itemDetail.price)) * (1 - (parseInt(itemDetail.discount1) / 100)) * (1 - (parseInt(itemDetail.discount2) / 100)) * (1 - (parseInt(itemDetail.specialDiscount) / 100))
        this.sumTotal(); 
    }
    
    sumTotal() {
        this.data.totalProduct = 0;
        this.data.subTotal = 0;
        this.data.totalDiscount = 0;
        this.data.total = 0;
        for(var item of this.data.items){
            this.data.subTotal = parseInt(this.data.subTotal) + parseInt(item.total);
            this.data.totalProduct = parseInt(this.data.totalProduct) + parseInt(item.quantity);
        }
        this.data.totalDiscount = parseInt(this.data.subTotal) * parseInt(this.data.discount) / 100;
        this.data.total = parseInt(this.data.subTotal) - parseInt(this.data.totalDiscount);
        this.data.grandTotal = this.data.total;
        this.refreshDetail();
    }
    
    refreshDetail() { 
        this.data.grandTotal = 0;
        //this.data.paymentDetail.voucherDiscount = 0;
        this.data.grandTotal = parseInt(this.data.total) - parseInt(this.data.paymentDetail.voucherDiscount);
        //this.data.paymentDetail.cashAmount = 0;
        //this.data.paymentDetail.cardAmount = 0;
        
        var refund = parseInt(this.data.paymentDetail.cashAmount) + parseInt(this.data.paymentDetail.cardAmount) - parseInt(this.data.grandTotal);
        if(refund < 0)
            refund = 0;
        this.data.paymentDetail.refund = refund;
    }
    
    checkPaymentType() {
        this.isCard = false;
        this.isCash = false;
        this.service.getPaymentTypeById(this.data.paymentDetail.paymentTypeId)
            .then(result => {  
                var _PaymentTypeResult = result; 
                if(_PaymentTypeResult.name.toLowerCase() == 'cash'){  
                    this.isCash = true;
                }
                else if(_PaymentTypeResult.name.toLowerCase() == 'card'){  
                    this.isCard = true;
                }
                else if(_PaymentTypeResult.name.toLowerCase() == 'partial'){  
                    this.isCard = true;
                    this.isCash = true;
                } 
            })
    }
}
 