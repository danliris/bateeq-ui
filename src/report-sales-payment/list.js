import {inject, Lazy, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service, BindingEngine)
export class List {
    
    storeApiUri = require('../host').master + '/stores';
    
    constructor(router, service, bindingEngine) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine; 
        
        this.data = { filter: {}, results: [] };
        this.error = { filter: {}, results: [] };
        this.dateFromPicker = this.getStringDate(new Date());
        this.dateToPicker = this.getStringDate(new Date());
        this.setDateFrom();
        this.setDateTo();
        this.isFilter = false;
        this.reportHTML = ""
        
        this.totalQty = 0;
        this.totalOmsetBruto = 0;
        this.totalOmsetNetto = 0;
        this.targetPerMonth = 0;
        this.sisaTargetNominal = 0;
        this.sisaTargetPercentage = 0;
    }

    activate() { 
    }
     
    attached() { 
        this.bindingEngine.propertyObserver(this.data.filter, "storeId").subscribe((newValue, oldValue) => {
            this.targetPerMonth = 0;
            if(this.data.filter.store)
                if(this.data.filter.store.salesTarget)
                    this.targetPerMonth = this.data.filter.store.salesTarget;
        }); 
    }
    
    filter() { 
        this.error = { filter: {}, results: [] };
        var datefrom = new Date(this.data.filter.dateFrom);
        var dateto = new Date(this.data.filter.dateTo);
        
        if(this.data.filter.storeId == undefined || this.data.filter.storeId == '')
            this.error.filter.storeId = "Please choose Store";
        else if(dateto < datefrom)
            this.error.filter.dateTo = "Date To must bigger than from";
        else{ 
            var getData = [];
            for(var d = datefrom; d <= dateto; d.setDate(d.getDate() + 1)) {
                var from = new Date(d);
                var to = new Date(this.getStringDate(from) + 'T23:59:59');
                getData.push(this.service.getAllSalesByFilter(this.data.filter.storeId, from, to));
            }
            Promise.all(getData)
                .then(salesPerDays => {   
                    this.data.results = [];
                    for(var salesPerDay of salesPerDays)
                    { 
                        if(salesPerDay.length != 0)
                        { 
                            var totalQty = 0;
                            var totalOmsetBruto = 0;
                            var totalDiscount1Nominal = 0;
                            var totalDiscount1Netto = 0;
                            var totalDiscount2Nominal = 0;
                            var totalDiscount2Netto = 0;
                            var totalDiscountNominal = 0;
                            var totalDiscountNominalNetto = 0;
                            var totalDiscountSpecialNominal = 0;
                            var totalDiscountSpecialNetto = 0;
                            var totalDiscountMarginNominal = 0;
                            var totalDiscountMarginNetto = 0;
                            var totalTotal = 0;
                            var totalSubTotal = 0;
                            var totalDiscountSaleNominal = 0;
                            var totalGrandTotal = 0;
                                
                            var tanggalRowSpan = 0;
                            var result = {};
                            result.items = [];
                            for(var data of salesPerDay)
                            {   
                                var itemRowSpan = 0;
                                var subtotal = 0;
                                var itemData = {};
                                itemData.details = [];
                                result.tanggal = new Date(data.date);
                                for(var item of data.items)
                                {
                                    var detail = {};
                                    detail.barcode = item.articleVariant.code;
                                    detail.namaProduk = item.articleVariant.name;
                                    detail.size = item.articleVariant.size;
                                    detail.harga = item.articleVariant.domesticSale;
                                    detail.quantity = item.quantity;
                                    detail.omsetBrutto = parseInt(detail.harga) * parseInt(detail.quantity);
                                    detail.discount1Percentage = item.discount1;
                                    detail.discount1Nominal = parseInt(detail.omsetBrutto) * parseInt(detail.discount1Percentage) / 100;
                                    detail.discount1Netto = parseInt(detail.omsetBrutto) - parseInt(detail.discount1Nominal);
                                    detail.discount2Percentage = item.discount2;
                                    detail.discount2Nominal = parseInt(detail.discount1Netto) * parseInt(detail.discount2Percentage) / 100;
                                    detail.discount2Netto = parseInt(detail.discount1Netto) - parseInt(detail.discount2Nominal);
                                    detail.discountNominal = item.discountNominal;
                                    detail.discountNominalNetto = parseInt(detail.discount2Netto) - parseInt(detail.discountNominal);
                                    detail.discountSpecialPercentage = item.specialDiscount;
                                    detail.discountSpecialNominal = parseInt(detail.discountNominalNetto) * parseInt(detail.discountSpecialPercentage) / 100;
                                    detail.discountSpecialNetto = parseInt(detail.discountNominalNetto) - parseInt(detail.discountSpecialNominal);
                                    detail.discountMarginPercentage = item.margin;
                                    detail.discountMarginNominal = parseInt(detail.discountSpecialNetto) * parseInt(detail.discountMarginPercentage) / 100;
                                    detail.discountMarginNetto = parseInt(detail.discountSpecialNetto) - parseInt(detail.discountMarginNominal);
                                    detail.total = parseInt(detail.discountMarginNetto);
                                    
                                    subtotal = parseInt(subtotal) + parseInt(detail.total); 
                                    itemData.details.push(detail);
                                    
                                    totalQty += parseInt(detail.quantity);
                                    totalOmsetBruto += parseInt(detail.omsetBrutto);
                                    totalDiscount1Nominal += parseInt(detail.discount1Nominal);
                                    totalDiscount1Netto += parseInt(detail.discount1Netto);
                                    totalDiscount2Nominal += parseInt(detail.discount2Nominal);
                                    totalDiscount2Netto += parseInt(detail.discount2Netto);
                                    totalDiscountNominal += parseInt(detail.discountNominal);
                                    totalDiscountNominalNetto += parseInt(detail.discountNominalNetto);
                                    totalDiscountSpecialNominal += parseInt(detail.discountSpecialNominal);
                                    totalDiscountSpecialNetto += parseInt(detail.discountSpecialNetto);
                                    totalDiscountMarginNominal += parseInt(detail.discountMarginNominal);
                                    totalDiscountMarginNetto += parseInt(detail.discountMarginNetto);
                                    totalTotal += parseInt(detail.total);
                                    
                                    tanggalRowSpan +=1;
                                    itemRowSpan +=1;
                                }
                                itemData.nomorPembayaran = data.code;
                                itemData.subTotal = parseInt(subtotal); 
                                itemData.discountSalePercentage = data.discount;
                                itemData.discountSaleNominal = parseInt(itemData.subTotal) * parseInt(itemData.discountSalePercentage) / 100;
                                itemData.grandTotal = parseInt(itemData.subTotal) - parseInt(itemData.discountSaleNominal);
                                itemData.tipePembayaran = data.salesDetail.paymentType;
                                itemData.card = data.salesDetail.cardType.name ? data.salesDetail.cardType.name : "";
                                itemData.itemRowSpan = itemRowSpan;
                                 
                                totalSubTotal += parseInt(itemData.subTotal);
                                totalDiscountSaleNominal += parseInt(itemData.discountSaleNominal);
                                totalGrandTotal += parseInt(itemData.grandTotal);
                                
                                result.items.push(itemData);
                            }
                            result.totalQty = totalQty;
                            result.totalOmsetBruto = totalOmsetBruto;
                            result.totalDiscount1Nominal = totalDiscount1Nominal;
                            result.totalDiscount1Netto = totalDiscount1Netto;
                            result.totalDiscount2Nominal = totalDiscount2Nominal;
                            result.totalDiscount2Netto = totalDiscount2Netto;
                            result.totalDiscountNominal = totalDiscountNominal;
                            result.totalDiscountNominalNetto = totalDiscountNominalNetto;
                            result.totalDiscountSpecialNominal = totalDiscountSpecialNominal;
                            result.totalDiscountSpecialNetto = totalDiscountSpecialNetto;
                            result.totalDiscountMarginNominal = totalDiscountMarginNominal;
                            result.totalDiscountMarginNetto = totalDiscountMarginNetto;
                            result.totalTotal = totalTotal;
                            result.totalSubTotal = totalSubTotal;
                            result.totalDiscountSaleNominal = totalDiscountSaleNominal;
                            result.totalGrandTotal = totalGrandTotal;
                            
                            result.tanggalRowSpan = tanggalRowSpan;
                            this.data.results.push(result);
                        } 
                    }  
                    this.generateReportHTML();
                    this.isFilter = true; 
                })
        } 
    } 
    
    getStringDate(date) { 
        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0! 
        var yyyy = date.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        date = yyyy+'-'+mm+'-'+dd;
        return date; 
    }
    
    setDateFrom() { 
        this.data.filter.dateFrom = this.dateFromPicker + 'T00:00:00';        
    }
    
    setDateTo() { 
        this.data.filter.dateTo = this.dateToPicker + 'T23:59:59';        
    }
    
    generateReportHTML() {
        this.totalQty = 0;
        this.totalOmsetBruto = 0;
        this.totalOmsetNetto = 0;
        
        //console.log(JSON.stringify(this.data.results));
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        this.reportHTML = "";
        this.reportHTML += "    <table class='table table-fixed'>";
        this.reportHTML += "        <thead>";
        this.reportHTML += "            <tr style='background-color:#282828; color:#ffffff;'>";
        this.reportHTML += "                <th>Tanggal</th>";
        this.reportHTML += "                <th>No Pembayaran</th>";
        this.reportHTML += "                <th>Barcode</th>";
        this.reportHTML += "                <th>Nama Produk</th>";
        this.reportHTML += "                <th>Size</th>";
        this.reportHTML += "                <th>Harga</th>";
        this.reportHTML += "                <th>QTY</th>";
        this.reportHTML += "                <th>Omset Brutto</th>";
        this.reportHTML += "                <th>Disc 1 (%)</th>";
        this.reportHTML += "                <th>Disc 1 (Nominal)</th>";
        this.reportHTML += "                <th>Netto (setelah disc 1)</th>";
        this.reportHTML += "                <th>Disc 2 (%)</th>";
        this.reportHTML += "                <th>Disc 2 (Nominal)</th>";
        this.reportHTML += "                <th>Netto (setelah disc 2)</th>";
        this.reportHTML += "                <th>Diskon Nominal</th>";
        this.reportHTML += "                <th>Netto (setelah diskon nominal)</th>";
        this.reportHTML += "                <th>Special Disc (%)</th>";
        this.reportHTML += "                <th>Special Disc (Nominal)</th>";
        this.reportHTML += "                <th>Netto (setelah special disc)</th>";
        this.reportHTML += "                <th>Margin (%)</th>";
        this.reportHTML += "                <th>Margin (Nominal)</th>";
        this.reportHTML += "                <th>Netto (setelah margin)</th>";
        this.reportHTML += "                <th>Total</th>";
        this.reportHTML += "                <th>Subtotal</th>";
        this.reportHTML += "                <th>Disc Penjualan (%)</th>";
        this.reportHTML += "                <th>Disc Penjualan (Nominal)</th>";
        this.reportHTML += "                <th>Grand Total</th>";
        this.reportHTML += "                <th>Tipe Pembayaran</th>";
        this.reportHTML += "                <th>Kartu</th>";
        this.reportHTML += "            </tr>";
        this.reportHTML += "        </thead>";
        this.reportHTML += "        <tbody>"; 
        for(var data of this.data.results) {
            var isTanggalRowSpan = false;
            for(var item of data.items) {
                var isItemRowSpan = false;
                for(var itemDetail of item.details) {
                    this.reportHTML += "        <tr>";
                    if(!isTanggalRowSpan)
                        this.reportHTML += "        <td width='300px' rowspan='" + data.tanggalRowSpan + "'>" + data.tanggal.getDate() + " " + months[data.tanggal.getMonth()] + " " + data.tanggal.getFullYear()+"</td>";
                    if(!isItemRowSpan)
                        this.reportHTML += "        <td rowspan='" + item.itemRowSpan + "'>" + item.nomorPembayaran +"</td>";
                    this.reportHTML += "            <td>" + itemDetail.barcode +"</td>";
                    this.reportHTML += "            <td>" + itemDetail.namaProduk +"</td>";
                    this.reportHTML += "            <td>" + itemDetail.size +"</td>";
                    this.reportHTML += "            <td>" + itemDetail.harga.toLocaleString() +"</td>";
                    this.reportHTML += "            <td>" + itemDetail.quantity.toLocaleString() +"</td>";
                    this.reportHTML += "            <td>" + itemDetail.omsetBrutto.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#48cbe2;'>" + itemDetail.discount1Percentage +"%</td>";
                    this.reportHTML += "            <td style='background-color:#48cbe2;'>" + itemDetail.discount1Nominal.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#48cbe2;'>" + itemDetail.discount1Netto.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#48e2b2;'>" + itemDetail.discount2Percentage +"%</td>";
                    this.reportHTML += "            <td style='background-color:#48e2b2;'>" + itemDetail.discount2Nominal.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#48e2b2;'>" + itemDetail.discount2Netto.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#48e24b;'>" + itemDetail.discountNominal.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#48e24b;'>" + itemDetail.discountNominalNetto.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#d6e248;'>" + itemDetail.discountSpecialPercentage +"%</td>";
                    this.reportHTML += "            <td style='background-color:#d6e248;'>" + itemDetail.discountSpecialNominal.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#d6e248;'>" + itemDetail.discountSpecialNetto.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#e28848;'>" + itemDetail.discountMarginPercentage +"%</td>";
                    this.reportHTML += "            <td style='background-color:#e28848;'>" + itemDetail.discountMarginNominal.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#e28848;'>" + itemDetail.discountMarginNetto.toLocaleString() +"</td>";
                    this.reportHTML += "            <td style='background-color:#92e045;'>" + itemDetail.total.toLocaleString() +"</td>";
                    if(!isItemRowSpan)
                    {
                        this.reportHTML += "        <td style='background-color:#e24871;' rowspan='" + item.itemRowSpan + "'>" + item.subTotal.toLocaleString() +"</td>";
                        this.reportHTML += "        <td rowspan='" + item.itemRowSpan + "'>" + item.discountSalePercentage +"%</td>";
                        this.reportHTML += "        <td rowspan='" + item.itemRowSpan + "'>" + item.discountSaleNominal.toLocaleString() +"</td>";
                        this.reportHTML += "        <td style='background-color:#e0a545;' rowspan='" + item.itemRowSpan + "'>" + item.grandTotal.toLocaleString() +"</td>";
                        this.reportHTML += "        <td rowspan='" + item.itemRowSpan + "'>" + item.tipePembayaran +"</td>";
                        this.reportHTML += "        <td rowspan='" + item.itemRowSpan + "'>" + item.card +"</td>";
                    }
                    this.reportHTML += "        </tr>";
                    isTanggalRowSpan = true;
                    isItemRowSpan = true;
                }
            } 
            this.reportHTML += "    <tr style='background-color:#282828; color:#ffffff;'>"; 
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td>" + data.totalQty.toLocaleString() +"</td>";
            this.reportHTML += "        <td>" + data.totalOmsetBruto.toLocaleString() +"</td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td>" + data.totalDiscount1Nominal.toLocaleString() +"</td>";
            this.reportHTML += "        <td>" + data.totalDiscount1Netto.toLocaleString() +"</td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td>" + data.totalDiscount2Nominal.toLocaleString() +"</td>";
            this.reportHTML += "        <td>" + data.totalDiscount2Netto.toLocaleString() +"</td>";
            this.reportHTML += "        <td>" + data.totalDiscountNominal.toLocaleString() +"</td>";
            this.reportHTML += "        <td>" + data.totalDiscountNominalNetto.toLocaleString() +"</td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td>" + data.totalDiscountSpecialNominal.toLocaleString() +"</td>";
            this.reportHTML += "        <td>" + data.totalDiscountSpecialNetto.toLocaleString() +"</td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td>" + data.totalDiscountMarginNominal.toLocaleString() +"</td>";
            this.reportHTML += "        <td>" + data.totalDiscountMarginNetto.toLocaleString() +"</td>";
            this.reportHTML += "        <td>" + data.totalTotal.toLocaleString() +"</td>";
            this.reportHTML += "        <td>" + data.totalSubTotal.toLocaleString() +"</td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td>" + data.totalDiscountSaleNominal.toLocaleString() +"</td>";
            this.reportHTML += "        <td>" + data.totalGrandTotal.toLocaleString() +"</td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "        <td></td>";
            this.reportHTML += "    </tr>"; 
            this.totalQty += parseInt(data.totalQty);
            this.totalOmsetBruto += parseInt(data.totalOmsetBruto);
            this.totalOmsetNetto += parseInt(data.totalGrandTotal);
        } 
        this.reportHTML += "        </tbody>";
        this.reportHTML += "    </table>";
         
        this.sisaTargetNominal = parseInt(this.totalOmsetNetto) - parseInt(this.targetPerMonth);
        this.sisaTargetPercentage = parseInt(this.totalOmsetNetto) / parseInt(this.targetPerMonth) * 100; 
    }
}
