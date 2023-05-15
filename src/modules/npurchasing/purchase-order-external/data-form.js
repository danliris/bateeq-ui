import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/nsupplier-loader');
var CurrencyLoader = require('../../../loader/ncurrency-loader');
var UnitLoader = require('../../../loader/nunit-loader');
var IncomeTaxLoader = require('../../../loader/nincome-tax-loader');
var VatTaxLoader = require('../../../loader/nvat-tax-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedCurrency;
    @bindable selectedIncomeTax;
    @bindable selectedUnit;
    @bindable options = { useVat: false };
    @bindable selectedVatTax;

    IncomeTaxByOptions=["Supplier","Dan Liris"];

    termPaymentOptions = ['CASH', 'KREDIT', 'DP (DOWN PAYMENT) + BP (BALANCE PAYMENT)', 'DP (DOWN PAYMENT) + TERMIN 1 + BP (BALANCE PAYMENT)', 'RETENSI'];
    freightCostByOptions = ['Penjual', 'Pembeli'];
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    itemsColumns = [{ header: "Nomor PR", value: "purchaseRequest.no" }]

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }
    get vatTaxLoader() {
        return VatTaxLoader;
    }
    vatTaxView = (vatTax) => {
        var rate = vatTax.rate ? vatTax.rate : vatTax.Rate;
        return `${rate}`
    }
    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.supplier) {
            this.selectedSupplier = this.data.supplier;
        }
        if (this.data.unit) {
            this.selectedUnit = this.data.unit;
            this.options.unitCode=this.selectedUnit.name;
        }
        if (this.data.currency) {
            this.selectedCurrency = this.data.currency;
            this.data.currencyRate=this.data.currency.rate;
        }
        if (this.data.incomeTax) {
            this.selectedIncomeTax = this.data.incomeTax;
            this.data.incomeTaxRate=this.data.incomeTax.rate;
        }
        if (this.data.useVat) {
            this.options.useVat = true;
            if(this.data.vatRate){
                this.selectedVatTax= {
                    Id: this.data.vatId,
                    Rate: this.data.vatRate
                }
            }
        }
        if(this.data.VatRate){
            this.selectedVatTax= {
                Id: this.data.VatId,
                Rate: this.data.VatRate
            }
        }
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    selectedSupplierChanged(newValue) {
        var _selectedSupplier = newValue;
        if (_selectedSupplier._id) {
            this.data.supplier = _selectedSupplier;
            this.data.supplierId = _selectedSupplier._id ? _selectedSupplier._id : "";
        }
    }

    selectedUnitChanged(newValue) {
        var _selectedUnit = newValue;
        if(this.data.unit && this.data.unit!=newValue){
            if(this.data && this.data.items && this.data.items.length > 0){
                var count = this.data.items.length;
                for(var a = count; a >= 0; a--){
                    this.data.items.splice((a-1), 1);
                }
            }
        }
        if (_selectedUnit.Id) {
            this.data.unit = _selectedUnit;
            this.data.unit._id = _selectedUnit.Id;
            this.data.unit.name = _selectedUnit.Name;
            this.data.unit.code = _selectedUnit.Code;
            this.data.unitId = _selectedUnit.Id ? _selectedUnit.Id : "";
            this.data.division=_selectedUnit.Division;
            this.options.unitCode=_selectedUnit.Name;
            this.data.unit.division=_selectedUnit.Division;
            this.data.unit.division._id=_selectedUnit.Division.Id;
            this.data.unit.division.name=_selectedUnit.Division.Name;
            this.data.unit.division.code=_selectedUnit.Division.Code;
        }
    }

    selectedCurrencyChanged(newValue) {
        var _selectedCurrency = newValue;
        if (_selectedCurrency.Id) {
            var currencyRate = parseInt(_selectedCurrency.Rate ? _selectedCurrency.Rate :_selectedCurrency.rate?_selectedCurrency.rate : 1, 10);
            this.data.currency = _selectedCurrency;
            this.data.currencyRate = currencyRate;
            this.data.currency._id = _selectedCurrency.Id;
            this.data.currency.code = _selectedCurrency.Code;
            this.data.currency.rate = this.data.currencyRate;
            
        }
        else {
            this.data.currencyRate = 0;
            if(_selectedCurrency.rate){
                this.data.currencyRate=_selectedCurrency.rate;
            }
        }
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.paymentMethod = selectedPayment;
            if (this.data.paymentMethod == "CASH") {
                this.data.paymentDueDays = 0;
            }
            else {
                this.data.paymentDueDays = 30;
            }
        }
    }

    selectedIncomeTaxChanged(newValue) {
        var _selectedIncomeTax = newValue;
        
        if (!_selectedIncomeTax) {
            this.data.incomeTaxRate = 0;
            this.data.useIncomeTax = false;
            this.data.incomeTax = {};
            this.data.incomeTaxBy="";
        } else if (_selectedIncomeTax._id || _selectedIncomeTax.Id) {
            this.data.incomeTaxRate = _selectedIncomeTax.rate ? _selectedIncomeTax.rate : 0;
            this.data.useIncomeTax = true;
            this.data.incomeTax = _selectedIncomeTax;
            this.data.incomeTax._id=_selectedIncomeTax.Id || _selectedIncomeTax._id ;
        }
    }

    async useVatChanged(e) {
        var selectedUseVat = e.srcElement.checked || false;
        if (!selectedUseVat) {
            this.options.useVat = false;
            for (var po of this.data.items) {
                for (var poItem of po.items) {
                    poItem.useVat = false;
                    poItem.pricePerDealUnit = poItem.priceBeforeTax;
                }
            }
            if(this.data.items){
                for(var item of this.data.items){
                    if(item.details)
                        for(var detail of item.details){
                            detail.includePpn=false;
                        }
                }
            }
            
        } else {
            this.options.useVat = true;
            let info = {
                keyword:'',
                order: '{ "Rate" : "desc" }',
                size: 1,
            };

            var defaultVat = await this.service.getDefaultVat(info);
            console.log(defaultVat);

            if(defaultVat.length > 0){
                if(defaultVat[0]){
                    if(defaultVat[0].Id){
                        this.data.Vat = defaultVat[0];
                        this.selectedVatTax = defaultVat[0];
                        this.data.VatRate= this.selectedVatTax.Rate;
                        this.data.VatId=this.selectedVatTax.Id;
                    }
                }
            }
        }
    }

    get supplierLoader() {
        return SupplierLoader;
    }
    
    get unitLoader() {
        return UnitLoader;
    }


    get currencyLoader() {
        return CurrencyLoader;
    }

    get incomeTaxLoader() {
        return IncomeTaxLoader;
    }

    get addItems() {
        return (event) => {
            this.data.items.push({ purchaseRequest: { no: "" } })
        };
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

    unitView = (unit) => {
        return unit.division ?`${unit.division.name} - ${unit.name}` : `${unit.Division.Name} - ${unit.Name}`;
    }

    currencyView = (currency) => {
        return currency.Code?currency.Code:currency.code;
    }

    incomeTaxView = (incomeTax) => {
        return incomeTax.name?`${incomeTax.name} - ${incomeTax.rate}`:"";
    }

} 