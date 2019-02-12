import { Router } from "aurelia-router";
import { Service } from "./services/service";
import {
  inject,
  bindable,
  computedFrom,
  BindingEngine
} from "aurelia-framework";
import { OngkosService } from "./services/ongkos-service";
import { EfficiencyService } from "./services/efficiency-service";
import { NumberFormatValueConverter } from "../../../lib/number-format-value-converter";
import numeral from "numeral";
const articleStyleLoader = require("../../../loader/sub-counter-loader");
const articleSeasonLoader = require("../../../loader/season-loader");
const buyerLoader = require("../../../loader/buyer-loader");
const sizeRangeLoader = require("../../../loader/size-range-loader");
const articleCounterLoader = require("../../../loader/counter-loader");
const defaultNumberFormat = "0,0.00";
const ongkosNumberFormat = "0,0.000";

@inject(
  Router,
  Service,
  BindingEngine,
  OngkosService,
  EfficiencyService,
  NumberFormatValueConverter
)
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
  @bindable SelectedRounding;

  radio = {
    Rounding20: "Rounding20",
    Rounding21: "Rounding21",
    Rounding22: "Rounding22",
    Rounding23: "Rounding23",
    Rounding24: "Rounding24",
    Rounding25: "Rounding25",
    Rounding26: "Rounding26",
    Rounding27: "Rounding27",
    Rounding28: "Rounding28",
    Rounding29: "Rounding29",
    Rounding30: "Rounding30",
    RoundingOthers: "RoundingOthers"
  };

  defaultRate = { Id: 0, Value: 0, CalculatedValue: 0 };

  length0 = {
    label: {
      align: "left"
    }
  };

  length4 = {
    label: {
      align: "left",
      length: 4
    }
  };

  length6 = {
    label: {
      align: "left",
      length: 6
    }
  };

  length8 = {
    label: {
      align: "left",
      length: 8
    }
  };

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
    }.bind(this),
    onRemove: function () {
    }.bind(this)
  };

  constructor(
    router,
    service,
    bindingEngine,
    ongkosService,
    efficiencyService,
    numberFormatValueConverter
  ) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.ongkosService = ongkosService;
    this.efficiencyService = efficiencyService;
    this.numberFormatValueConverter = numberFormatValueConverter;
    this.defaultOL = this.defaultOTL1 = this.defaultOTL2 = this.defaultOTL3 = this.defaultTHR = this.defaultRate;
  }

  @bindable imageUpload;
  @bindable imageSrc;
  imageUploadChanged(newValue) {
    let imageInput = document.getElementById("imageInput");
    let reader = new FileReader();
    reader.onload = event => {
      let base64Image = event.target.result;
      this.imageSrc = this.data.ImageFile = base64Image;
    };
    reader.readAsDataURL(imageInput.files[0]);
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || 0) != 0;
  }

  @computedFrom("error.CostCalculationRetail_MaterialTable")
  get hasError() {
    return (
      (this.error.CostCalculationRetail_MaterialTable
        ? this.error.CostCalculationRetail_MaterialTable.length
        : 0) > 0
    );
  }

  SelectedRoundingChanged(newValue) {
    this.data.SelectedRounding = newValue;
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.data.Risk = this.data.Risk ? this.data.Risk : 5;
    this.Quantity = this.data.Quantity ? this.data.Quantity : 1;
    this.SelectedRounding = this.data.SelectedRounding
      ? this.data.SelectedRounding
      : this.radio.Rounding20;
    this.OLCheck = this.data.OL ? (this.data.OL.Id ? true : false) : false;
    this.OTL1Check = this.data.OTL1
      ? this.data.OTL1.Id
        ? true
        : false
      : false;
    this.OTL2Check = this.data.OTL2
      ? this.data.OTL2.Id
        ? true
        : false
      : false;
    this.OTL3Check = this.data.OTL3
      ? this.data.OTL3.Id
        ? true
        : false
      : false;
    this.imageSrc = this.data.ImageFile;

    this.defaultOL = await this.ongkosService
      .search({ keyword: "OL R" })
      .then(results => {
        let result = results.data[0] ? results.data[0] : this.defaultRate;
        result.CalculatedValue = 0;
        return result;
      });
    this.defaultOTL1 = await this.ongkosService
      .search({ keyword: "OTL 1 R" })
      .then(results => {
        let result = results.data[0] ? results.data[0] : this.defaultRate;
        result.CalculatedValue = 0;
        return result;
      });
    this.defaultOTL2 = await this.ongkosService
      .search({ keyword: "OTL 2 R" })
      .then(results => {
        let result = results.data[0] ? results.data[0] : this.defaultRate;
        result.CalculatedValue = 0;
        return result;
      });
    this.defaultOTL3 = await this.ongkosService
      .search({ keyword: "OTL 3 R" })
      .then(results => {
        let result = results.data[0] ? results.data[0] : this.defaultRate;
        result.CalculatedValue = 0;
        return result;
      });
    this.defaultTHR = await this.ongkosService
      .search({ keyword: "THR" })
      .then(results => {
        let result = results.data[0] ? results.data[0] : this.defaultRate;
        result.CalculatedValue = 0;
        return result;
      });
  }

  @computedFrom(
    "defaultOL",
    "defaultTHR",
    "OLCheck",
    "data.SH_Cutting",
    "data.SH_Sewing",
    "data.SH_Finishing"
  )
  get OL() {
    if (this.OLCheck) {
      let mTarifOL = this.defaultOL.Value;
      let mTarifTHR = this.defaultTHR.Value;
      let mSWCutting = this.data.SH_Cutting;
      let mSWSewing = this.data.SH_Sewing;
      let mSWFinishing = this.data.SH_Finishing;
      let mTotalSW = mSWCutting + mSWSewing + mSWFinishing;
      let mEff_Prod = 100;
      let mEff = this.data.Efficiency.Value || 0;
      let calculatedOL =
        mTarifOL * mSWCutting * mEff_Prod / 75 +
        mTarifOL * mSWSewing * mEff_Prod / mEff +
        mTarifOL * mSWFinishing * mEff_Prod / 90 +
        mTarifTHR * mTotalSW;
      let result = {
        Id: this.defaultOL.Id,
        Value: this.defaultOL.Value,
        CalculatedValue: parseFloat(calculatedOL.toFixed(2))
      };
      this.data.OL = result;
    } else {
      this.data.OL = this.defaultRate;
    }
    return {
      Id: this.data.OL.Id,
      Value: numeral(this.data.OL.Value).format(ongkosNumberFormat),
      CalculatedValue: this.data.OL.CalculatedValue
    };
  }

  @computedFrom(
    "defaultOTL1",
    "OTL1Check",
    "data.SH_Cutting",
    "data.SH_Sewing",
    "data.SH_Finishing"
  )
  get OTL1() {
    if (this.OTL1Check) {
      let mTarifOTL1 = this.defaultOTL1.Value;
      let mTotalSH =
        this.data.SH_Cutting + this.data.SH_Sewing + this.data.SH_Finishing;
      let calculatedOTL1 = mTarifOTL1 * mTotalSH * 60;
      let result = {
        Id: this.defaultOTL1.Id,
        Value: this.defaultOTL1.Value,
        CalculatedValue: parseFloat(calculatedOTL1.toFixed(2))
      };
      this.data.OTL1 = result;
    } else {
      this.data.OTL1 = this.defaultRate;
    }
    return {
      Id: this.data.OTL1.Id,
      Value: numeral(this.data.OTL1.Value).format(ongkosNumberFormat),
      CalculatedValue: this.data.OTL1.CalculatedValue
    };
  }

  @computedFrom(
    "defaultOTL2",
    "OTL2Check",
    "data.SH_Cutting",
    "data.SH_Sewing",
    "data.SH_Finishing"
  )
  get OTL2() {
    if (this.OTL2Check) {
      let mTarifOTL2 = this.defaultOTL2.Value;
      let mTotalSH =
        this.data.SH_Cutting + this.data.SH_Sewing + this.data.SH_Finishing;
      let calculatedOTL2 = mTarifOTL2 * mTotalSH * 60;
      let result = {
        Id: this.defaultOTL2.Id,
        Value: this.defaultOTL2.Value,
        CalculatedValue: parseFloat(calculatedOTL2.toFixed(2))
      };
      this.data.OTL2 = result;
    } else {
      this.data.OTL2 = this.defaultRate;
    }
    return {
      Id: this.data.OTL2.Id,
      Value: numeral(this.data.OTL2.Value).format(ongkosNumberFormat),
      CalculatedValue: this.data.OTL2.CalculatedValue
    };
  }

  @computedFrom(
    "defaultOTL3",
    "OTL3Check",
    "data.SH_Cutting",
    "data.SH_Sewing",
    "data.SH_Finishing"
  )
  get OTL3() {
    if (this.OTL3Check) {
      let mTarifOTL3 = this.defaultOTL3.Value;
      let mTotalSH =
        this.data.SH_Cutting + this.data.SH_Sewing + this.data.SH_Finishing;
      let calculatedOTL3 = mTarifOTL3 * mTotalSH * 60;
      let result = {
        Id: this.defaultOTL3.Id,
        Value: this.defaultOTL3.Value,
        CalculatedValue: parseFloat(calculatedOTL3.toFixed(2))
      };
      this.data.OTL3 = result;
    } else {
      this.data.OTL3 = this.defaultRate;
    }
    return {
      Id: this.data.OTL3.Id,
      Value: numeral(this.data.OTL3.Value).format(ongkosNumberFormat),
      CalculatedValue: this.data.OTL3.CalculatedValue
    };
  }

  async QuantityChanged(newValue) {
    this.data.Quantity = newValue;
    this.data.Efficiency = await this.efficiencyService.getEffByQty(
      this.data.Quantity
    );
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

  get articleCounterLoader() {
    return articleCounterLoader;
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
      totalCost =
        totalMaterial +
        this.data.OL.CalculatedValue +
        this.data.OTL1.CalculatedValue +
        this.data.OTL2.CalculatedValue +
        this.data.OTL3.CalculatedValue;
    }

    this.data.HPP = parseFloat(
      (totalCost + totalCost * this.data.Risk / 100).toFixed(0)
    );
    return this.numberFormatValueConverter.toView(
      this.data.HPP,
      defaultNumberFormat
    );
  }

  @computedFrom("data.HPP")
  get WholesalePrice() {
    this.data.WholesalePrice = this.data.HPP
      ? parseFloat((this.data.HPP * 2.2).toFixed(0))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.WholesalePrice,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed20() {
    this.data.Proposed20 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 2.0).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed20,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed21() {
    this.data.Proposed21 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 2.1).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed21,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed22() {
    this.data.Proposed22 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 2.2).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed22,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed23() {
    this.data.Proposed23 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 2.3).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed23,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed24() {
    this.data.Proposed24 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 2.4).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed24,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed25() {
    this.data.Proposed25 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 2.5).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed25,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed26() {
    this.data.Proposed26 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 2.6).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed26,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed27() {
    this.data.Proposed27 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 2.7).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed27,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed28() {
    this.data.Proposed28 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 2.8).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed28,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed29() {
    this.data.Proposed29 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 2.9).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed29,
      defaultNumberFormat
    );
  }

  @computedFrom("data.WholesalePrice")
  get Proposed30() {
    this.data.Proposed30 = this.data.WholesalePrice
      ? parseFloat((this.data.WholesalePrice * 3.0).toFixed(2))
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Proposed30,
      defaultNumberFormat
    );
  }

  roundTo9000(value) {
    let val = String(parseInt(value));
    let rounded = val.substring(0, val.length - 4) + "9000";
    let result = Number(rounded);
    return result;
  }

  @computedFrom("data.Proposed20")
  get Rounding20() {
    this.data.Rounding20 = this.data.Proposed20
      ? this.roundTo9000(this.data.Proposed20)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding20,
      defaultNumberFormat
    );
  }

  @computedFrom("data.Proposed21")
  get Rounding21() {
    this.data.Rounding21 = this.data.Proposed21
      ? this.roundTo9000(this.data.Proposed21)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding21,
      defaultNumberFormat
    );
  }

  @computedFrom("data.Proposed22")
  get Rounding22() {
    this.data.Rounding22 = this.data.Proposed22
      ? this.roundTo9000(this.data.Proposed22)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding22,
      defaultNumberFormat
    );
  }

  @computedFrom("data.Proposed23")
  get Rounding23() {
    this.data.Rounding23 = this.data.Proposed23
      ? this.roundTo9000(this.data.Proposed23)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding23,
      defaultNumberFormat
    );
  }

  @computedFrom("data.Proposed24")
  get Rounding24() {
    this.data.Rounding24 = this.data.Proposed24
      ? this.roundTo9000(this.data.Proposed24)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding24,
      defaultNumberFormat
    );
  }

  @computedFrom("data.Proposed25")
  get Rounding25() {
    this.data.Rounding25 = this.data.Proposed25
      ? this.roundTo9000(this.data.Proposed25)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding25,
      defaultNumberFormat
    );
  }

  @computedFrom("data.Proposed26")
  get Rounding26() {
    this.data.Rounding26 = this.data.Proposed26
      ? this.roundTo9000(this.data.Proposed26)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding26,
      defaultNumberFormat
    );
  }

  @computedFrom("data.Proposed27")
  get Rounding27() {
    this.data.Rounding27 = this.data.Proposed27
      ? this.roundTo9000(this.data.Proposed27)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding27,
      defaultNumberFormat
    );
  }

  @computedFrom("data.Proposed28")
  get Rounding28() {
    this.data.Rounding28 = this.data.Proposed28
      ? this.roundTo9000(this.data.Proposed28)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding28,
      defaultNumberFormat
    );
  }

  @computedFrom("data.Proposed29")
  get Rounding29() {
    this.data.Rounding29 = this.data.Proposed29
      ? this.roundTo9000(this.data.Proposed29)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding29,
      defaultNumberFormat
    );
  }

  @computedFrom("data.Proposed30")
  get Rounding30() {
    this.data.Rounding30 = this.data.Proposed30
      ? this.roundTo9000(this.data.Proposed30)
      : 0;
    return this.numberFormatValueConverter.toView(
      this.data.Rounding30,
      defaultNumberFormat
    );
  }

  @computedFrom("data.RoundingOthers")
  get EmptyRoundingOthers() {
    return this.data.RoundingOthers ? false : true;
  }
}
