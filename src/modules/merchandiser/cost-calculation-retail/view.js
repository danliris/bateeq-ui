import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import numeral from 'numeral';
const defaultNumberFormat = "0,0.00";
const ongkosNumberFormat = "0,0.000";

@inject(Router, Service)
export class View {
    title = "Detail Cost Calculation";
    readOnly = true;
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
            { header: "Conversion", value: "Conversion" },
            { header: "Total", value: "Total" }
        ]
    };

    priceInfo = {
        columns: [
            { header: "Ket (x)", value: "Multiplier" },
            { header: "Harga", value: "Proposed" },
            { header: "Pembulatan Harga", value: "Rounding" },
            { header: "Keterangan", value: "Description" },
            { header: "", value: "SelectedRounding" },
        ]
    };

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.OL.Rate = numeral(this.data.OL.Rate).format(ongkosNumberFormat);
        this.data.OTL1.Rate = numeral(this.data.OTL1.Rate).format(ongkosNumberFormat);
        this.data.OTL2.Rate = numeral(this.data.OTL2.Rate).format(ongkosNumberFormat);
        this.data.OTL3.Rate = numeral(this.data.OTL3.Rate).format(ongkosNumberFormat);
        this.data.OL.CalculatedRate = numeral(this.data.OL.CalculatedRate).format(ongkosNumberFormat);
        this.data.OTL1.CalculatedRate = numeral(this.data.OTL1.CalculatedRate).format(ongkosNumberFormat);
        this.data.OTL2.CalculatedRate = numeral(this.data.OTL2.CalculatedRate).format(ongkosNumberFormat);
        this.data.OTL3.CalculatedRate = numeral(this.data.OTL3.CalculatedRate).format(ongkosNumberFormat);
        this.data.HPP = numeral(this.data.HPP).format(defaultNumberFormat);
        this.data.WholesalePrice = numeral(this.data.WholesalePrice).format(defaultNumberFormat);
        this.data.STD_Hour = numeral(this.data.SH_Cutting + this.data.SH_Sewing + this.data.SH_Finishing).format(defaultNumberFormat);
        this.data.priceInfo = [
            { Multiplier: "2.0", Proposed: numeral(this.data.Proposed20).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding20).format(defaultNumberFormat), Description:"", SelectedRounding: this.data.SelectedRounding === "Rounding20" ? true : false },
            { Multiplier: "2.1", Proposed: numeral(this.data.Proposed21).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding21).format(defaultNumberFormat), Description: "", SelectedRounding: this.data.SelectedRounding === "Rounding21" ? true : false },
            { Multiplier: "2.2", Proposed: numeral(this.data.Proposed22).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding22).format(defaultNumberFormat), Description: "", SelectedRounding: this.data.SelectedRounding === "Rounding22" ? true : false },
            { Multiplier: "2.3", Proposed: numeral(this.data.Proposed23).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding23).format(defaultNumberFormat), Description: "", SelectedRounding: this.data.SelectedRounding === "Rounding23" ? true : false },
            { Multiplier: "2.4", Proposed: numeral(this.data.Proposed24).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding24).format(defaultNumberFormat), Description: "", SelectedRounding: this.data.SelectedRounding === "Rounding24" ? true : false },
            { Multiplier: "2.5", Proposed: numeral(this.data.Proposed25).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding25).format(defaultNumberFormat), Description: "", SelectedRounding: this.data.SelectedRounding === "Rounding25" ? true : false },
            { Multiplier: "2.6", Proposed: numeral(this.data.Proposed26).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding26).format(defaultNumberFormat), Description: "", SelectedRounding: this.data.SelectedRounding === "Rounding26" ? true : false },
            { Multiplier: "2.7", Proposed: numeral(this.data.Proposed27).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding27).format(defaultNumberFormat), Description: "", SelectedRounding: this.data.SelectedRounding === "Rounding27" ? true : false },
            { Multiplier: "2.8", Proposed: numeral(this.data.Proposed28).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding28).format(defaultNumberFormat), Description: "", SelectedRounding: this.data.SelectedRounding === "Rounding28" ? true : false },
            { Multiplier: "2.9", Proposed: numeral(this.data.Proposed29).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding29).format(defaultNumberFormat), Description: "", SelectedRounding: this.data.SelectedRounding === "Rounding29" ? true : false },
            { Multiplier: "3.0", Proposed: numeral(this.data.Proposed30).format(defaultNumberFormat), Rounding: numeral(this.data.Rounding30).format(defaultNumberFormat), Description: "", SelectedRounding: this.data.SelectedRounding === "Rounding30" ? true : false },
            { Multiplier: "Others", Proposed: "", Rounding: this.data.RoundingOthers ? numeral(this.data.RoundingOthers).format(defaultNumberFormat) : "", Description: "", SelectedRounding: this.data.SelectedRounding === "RoundingOthers" ? true : false },
        ]
    }

    async bind(context) {
        this.context = context;
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}