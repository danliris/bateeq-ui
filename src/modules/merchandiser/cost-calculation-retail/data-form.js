import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { OngkosService } from './ongkos-service';
import { EfficiencyService } from './efficiency-service';
import { NumberFormatValueConverter } from '../../../lib/number-format-value-converter';
import numeral from 'numeral';
const articleStyleLoader = require('../../../loader/sub-counter-loader');
const articleSeasonLoader = require('../../../loader/season-loader');
const buyerLoader = require('../../../loader/buyer-loader');
const sizeRangeLoader = require('../../../loader/size-range-loader');
const defaultNumberFormat = "0,0.00"; 
const ongkosNumberFormat = "0,0.000";

@inject(Router, Service, BindingEngine, OngkosService, EfficiencyService, NumberFormatValueConverter)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable disabled = "true";
    @bindable OLCheck;
    @bindable OTL1Check;
    @bindable OTL2Check;
    @bindable OTL3Check;
    @bindable Quantity;
    @bindable data = {};
    @bindable error = {};

    defaultRate = { Id: 0, Rate: 0, CalculatedRate: 0 };
    length0 = {
        label: {
            align: "left"
        }
    }
    length4 = {
        label: {
            align: "left",
            length: 4
        }
    }
    length6 = {
        label: {
            align: "left",
            length: 6
        }
    }
    length8 = {
        label: {
            align: "left",
            length: 8
        }
    }

    costCalculationRetail_MaterialsInfo = {
        columns: [
            { header: "Category", value: "Category" },
            { header: "Material", value: "Material" },
            { header: "Description", value: "Description" },
            { header: "Quantity", value: "Quantity" },
            { header: "Satuan", value: "SatuanQuantity" },
            { header: "Price", value: "Price" },
            { header: "Satuan", value: "SatuanPrice" },
            { header: "Conversion", value: "Conversion" },
            { header: "Total", value: "Total" }
        ],
        onAdd: function () {
            this.data.CostCalculationRetail_Materials.push({});
        }.bind(this)
    };

    constructor(router, service, bindingEngine, ongkosService, efficiencyService, numberFormatValueConverter) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.ongkosService = ongkosService;
        this.efficiencyService = efficiencyService;
        this.numberFormatValueConverter = numberFormatValueConverter;
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || 0) != 0;
    }

    @computedFrom("error.CostCalculationRetail_MaterialTable")
    get hasError() {
        return (this.error.CostCalculationRetail_MaterialTable ? this.error.CostCalculationRetail_MaterialTable.length : 0) > 0;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.data.Risk = this.data.Risk ? this.data.Risk : 5;
        this.Quantity = this.data.Quantity ? this.data.Quantity : 1;
        this.uncheckedOnceOL = false;
        this.uncheckedOnceOTL1 = false;
        this.uncheckedOnceOTL2 = false;
        this.uncheckedOnceOTL3 = false;
        this.OLCheck = this.data.OL ? (this.data.OL.Id ? true : false) : false;
        this.OTL1Check = this.data.OTL1 ? (this.data.OTL1.Id ? true : false) : false;
        this.OTL2Check = this.data.OTL2 ? (this.data.OTL2.Id ? true : false) : false;
        this.OTL3Check = this.data.OTL3 ? (this.data.OTL3.Id ? true : false) : false;

        this.defaultOL = await this.ongkosService.search({ keyword: "OL" })
            .then(results => {
                let result = results.data[0] ? results.data[0] : this.defaultRate;
                result.CalculatedRate = 0;
                return result;
            });
        this.defaultOTL1 = await this.ongkosService.search({ keyword: "OTL 1" })
            .then(results => {
                let result = results.data[0] ? results.data[0] : this.defaultRate;
                result.CalculatedRate = 0;
                return result;
            });
        this.defaultOTL2 = await this.ongkosService.search({ keyword: "OTL 2" })
            .then(results => {
                let result = results.data[0] ? results.data[0] : this.defaultRate;
                result.CalculatedRate = 0;
                return result;
            });
        this.defaultOTL3 = await this.ongkosService.search({ keyword: "OTL 3" })
            .then(results => {
                let result = results.data[0] ? results.data[0] : this.defaultRate;
                result.CalculatedRate = 0;
                return result;
            });
        this.defaultTHR = await this.ongkosService.search({ keyword: "THR" })
            .then(results => {
                let result = results.data[0] ? results.data[0] : this.defaultRate;
                result.CalculatedRate = 0;
                return result;
            });
    }

    @computedFrom("OLCheck", "data.SH_Cutting", "data.SH_Sewing", "data.SH_Finishing")
    get OLValue() {
        if (this.OLCheck) {
            if (!(this.data.OL ? (this.data.OL.Id ? true : false) : false) || this.uncheckedOnceOL) {
                let mTarifOL = this.defaultOL.Rate;
                let mTarifTHR = this.defaultTHR.Rate;
                let mSWCutting = this.data.SH_Cutting * 0.06;
                let mSWSewing = this.data.SH_Sewing * 0.06;
                let mSWFinishing = this.data.SH_Finishing * 0.06;
                let mTotalSW = mSWCutting + mSWSewing + mSWFinishing;
                let mEff_Prod = 100;
                let mEff = this.data.Efficiency.Value || 0;
                let calculatedOL = mTarifOL * 60 * mSWCutting * mEff_Prod / 75 +
                    mTarifOL * 60 * mSWSewing * mEff_Prod / mEff +
                    mTarifOL * 60 * mSWFinishing * mEff_Prod / 90 +
                    mTarifTHR * 60 * mTotalSW;
                let result = {
                    Id: this.defaultOL.Id,
                    Rate: this.defaultOL.Rate,
                    CalculatedRate: parseFloat(calculatedOL.toFixed(2))
                }
                this.data.OL = result;
            }
        }
        else {
            this.uncheckedOnceOL = true;
            this.data.OL = this.defaultRate;
        }
        return {
            Id: this.data.OL.Id,
            Rate: numeral(this.data.OL.Rate).format(ongkosNumberFormat),
            CalculatedRate: this.data.OL.CalculatedRate
        };
    }

    @computedFrom("OTL1Check", "data.SH_Cutting", "data.SH_Sewing", "data.SH_Finishing")
    get OTL1Value() {
        if (this.OTL1Check) {
            if (!(this.data.OTL1 ? (this.data.OTL1.Id ? true : false) : false) || this.uncheckedOnceOTL1) {
                let mTarifOTL1 = this.defaultOTL1.Rate;
                let mTotalSH = this.data.SH_Cutting + this.data.SH_Sewing + this.data.SH_Finishing;
                let calculatedOTL1 = mTarifOTL1 * mTotalSH * 3.6;
                let result = {
                    Id: this.defaultOTL1.Id,
                    Rate: this.defaultOTL1.Rate,
                    CalculatedRate: parseFloat(calculatedOTL1.toFixed(2))
                }
                this.data.OTL1 = result;
            }
        }
        else {
            this.uncheckedOnceOTL1 = true;
            this.data.OTL1 = this.defaultRate;
        }
        return {
            Id: this.data.OTL1.Id,
            Rate: numeral(this.data.OTL1.Rate).format(ongkosNumberFormat),
            CalculatedRate: this.data.OTL1.CalculatedRate
        };
    }

    @computedFrom("OTL2Check", "data.SH_Cutting", "data.SH_Sewing", "data.SH_Finishing")
    get OTL2Value() {
        if (this.OTL2Check) {
            if (!(this.data.OTL2 ? (this.data.OTL2.Id ? true : false) : false) || this.uncheckedOnceOTL2) {
                let mTarifOTL2 = this.defaultOTL2.Rate;
                let mTotalSH = this.data.SH_Cutting + this.data.SH_Sewing + this.data.SH_Finishing;
                let calculatedOTL2 = mTarifOTL2 * mTotalSH * 3.6;
                let result = {
                    Id: this.defaultOTL2.Id,
                    Rate: this.defaultOTL2.Rate,
                    CalculatedRate: parseFloat(calculatedOTL2.toFixed(2))
                }
                this.data.OTL2 = result;
            }
        }
        else {
            this.uncheckedOnceOTL2 = true;
            this.data.OTL2 = this.defaultRate;
        }
        return {
            Id: this.data.OTL2.Id,
            Rate: numeral(this.data.OTL2.Rate).format(ongkosNumberFormat),
            CalculatedRate: this.data.OTL2.CalculatedRate
        };
    }

    @computedFrom("OTL3Check", "data.SH_Cutting", "data.SH_Sewing", "data.SH_Finishing")
    get OTL3Value() {
        if (this.OTL3Check) {
            if (!(this.data.OTL3 ? (this.data.OTL3.Id ? true : false) : false) || this.uncheckedOnceOTL3) {
                let mTarifOTL3 = this.defaultOTL3.Rate;
                let mTotalSH = this.data.SH_Cutting + this.data.SH_Sewing + this.data.SH_Finishing;
                let calculatedOTL3 = mTarifOTL3 * mTotalSH * 3.6;
                let result = {
                    Id: this.defaultOTL3.Id,
                    Rate: this.defaultOTL3.Rate,
                    CalculatedRate: parseFloat(calculatedOTL3.toFixed(2))
                }
                this.data.OTL3 = result;
            }
        }
        else {
            this.uncheckedOnceOTL3 = true;
            this.data.OTL3 = this.defaultRate;
        }
        return {
            Id: this.data.OTL3.Id,
            Rate: numeral(this.data.OTL3.Rate).format(ongkosNumberFormat),
            CalculatedRate: this.data.OTL3.CalculatedRate
        };
    }

    async QuantityChanged(newValue) {
        this.data.Quantity = newValue;
        this.data.Efficiency = await this.efficiencyService.getEffByQty(this.data.Quantity);
    }

    get articleStyleLoader() {
        return articleStyleLoader;
    }

    get articleSeasonLoader() {
        return articleSeasonLoader;
    }

    get buyerLoader() {
        return buyerLoader;
    }

    get sizeRangeLoader() {
        return sizeRangeLoader;
    }

    get HPP() {
        let totalMaterial = 0;
        if (this.data.CostCalculationRetail_Materials) {
            for (let item of this.data.CostCalculationRetail_Materials) {
                totalMaterial += Number(item.Total);
            }
        }
        let totalCost = 0;
        if (totalMaterial > 0) {
            totalCost = totalMaterial + this.data.OL.CalculatedRate + this.data.OTL1.CalculatedRate + this.data.OTL2.CalculatedRate + this.data.OTL3.CalculatedRate;
        }
        
        this.data.HPP = parseFloat((totalCost + totalCost * this.data.Risk / 100).toFixed(2));
        return this.numberFormatValueConverter.toView(this.data.HPP, defaultNumberFormat);
    }

    @computedFrom("data.HPP")
    get WholesalePrice() {
        this.data.WholesalePrice = this.data.HPP ? parseFloat((this.data.HPP * 2.2).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.WholesalePrice, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed20() {
        this.data.Proposed20 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 2.0).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed20, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed21() {
        this.data.Proposed21 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 2.1).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed21, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed22() {
        this.data.Proposed22 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 2.2).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed22, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed23() {
        this.data.Proposed23 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 2.3).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed23, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed24() {
        this.data.Proposed24 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 2.4).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed24, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed25() {
        this.data.Proposed25 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 2.5).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed25, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed26() {
        this.data.Proposed26 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 2.6).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed26, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed27() {
        this.data.Proposed27 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 2.7).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed27, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed28() {
        this.data.Proposed28 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 2.8).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed28, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed29() {
        this.data.Proposed29 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 2.9).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed29, defaultNumberFormat);
    }

    @computedFrom("data.WholesalePrice")
    get Proposed30() {
        this.data.Proposed30 = this.data.WholesalePrice ? parseFloat((this.data.WholesalePrice * 3.0).toFixed(2)) : 0;
        return this.numberFormatValueConverter.toView(this.data.Proposed30, defaultNumberFormat);
    }

    roundTo9000(value) {
        let val = String(parseInt(value));
        let rounded = val.substring(0, val.length - 4) + '9000';
        let result = Number(rounded);
        return result;
    }

    @computedFrom("data.Proposed20")
    get Rounding20() {
        this.data.Rounding20 = this.data.Proposed20 ? this.roundTo9000(this.data.Proposed20) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding20, defaultNumberFormat);
    }

    @computedFrom("data.Proposed21")
    get Rounding21() {
        this.data.Rounding21 = this.data.Proposed21 ? this.roundTo9000(this.data.Proposed21) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding21, defaultNumberFormat);
    }

    @computedFrom("data.Proposed22")
    get Rounding22() {
        this.data.Rounding22 = this.data.Proposed22 ? this.roundTo9000(this.data.Proposed22) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding22, defaultNumberFormat);
    }

    @computedFrom("data.Proposed23")
    get Rounding23() {
        this.data.Rounding23 = this.data.Proposed23 ? this.roundTo9000(this.data.Proposed23) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding23, defaultNumberFormat);
    }

    @computedFrom("data.Proposed24")
    get Rounding24() {
        this.data.Rounding24 = this.data.Proposed24 ? this.roundTo9000(this.data.Proposed24) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding24, defaultNumberFormat);
    }

    @computedFrom("data.Proposed25")
    get Rounding25() {
        this.data.Rounding25 = this.data.Proposed25 ? this.roundTo9000(this.data.Proposed25) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding25, defaultNumberFormat);
    }

    @computedFrom("data.Proposed26")
    get Rounding26() {
        this.data.Rounding26 = this.data.Proposed26 ? this.roundTo9000(this.data.Proposed26) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding26, defaultNumberFormat);
    }

    @computedFrom("data.Proposed27")
    get Rounding27() {
        this.data.Rounding27 = this.data.Proposed27 ? this.roundTo9000(this.data.Proposed27) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding27, defaultNumberFormat);
    }

    @computedFrom("data.Proposed28")
    get Rounding28() {
        this.data.Rounding28 = this.data.Proposed28 ? this.roundTo9000(this.data.Proposed28) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding28, defaultNumberFormat);
    }

    @computedFrom("data.Proposed29")
    get Rounding29() {
        this.data.Rounding29 = this.data.Proposed29 ? this.roundTo9000(this.data.Proposed29) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding29, defaultNumberFormat);
    }

    @computedFrom("data.Proposed30")
    get Rounding30() {
        this.data.Rounding30 = this.data.Proposed30 ? this.roundTo9000(this.data.Proposed30) : 0;
        return this.numberFormatValueConverter.toView(this.data.Rounding30, defaultNumberFormat);
    }
}