import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './services/service';
import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
const US = "US$. ";

@inject(Router, Service)
export class View {
    title = "Detail Cost Calculation Garment";
    readOnly = true;
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
    length7 = {
        label: {
            align: "left",
            length: 7
        }
    }

    costCalculationGarment_MaterialsInfo = {
        columns: [
            { header: "Kategori", value: "Category" },
            { header: "Material", value: "Material" },
            { header: "Deskripsi", value: "Description" },
            { header: "Kuantitas", value: "Quantity" },
            { header: "Rp. PTC/PC", value: "PricePerUnit" },
            { header: "Rp. Total", value: "Total" }
        ]
    };

    priceInfo = {
        columns: [
            { header: "FOB Price", value: "FOB_Price" },
            { header: "CMT Price", value: "CMT_Price" },
            { header: "CNF Price", value: "CNF_Price" },
            { header: "CIF Price", value: "CIF_Price" }
        ]
    };

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.FabricAllowance = numeral(this.data.FabricAllowance).format();
        this.data.AccessoriesAllowance = numeral(this.data.AccessoriesAllowance).format();
        let total = 0;
        if (this.data.CostCalculationGarment_Materials){
            this.data.CostCalculationGarment_Materials.forEach(item => {
                total += Number(item.Total);
            })
        }
        this.data.Total = total;
        this.data.AfterOTL1 = this.data.Total + this.data.OTL1.CalculatedRate;
        this.data.AfterOTL2 = this.data.AfterOTL1 + this.data.OTL2.CalculatedRate;
        this.data.AfterRisk = (100 + this.data.Risk) * this.data.AfterOTL2 / 100;
        this.data.AfterFreightCost = this.data.AfterRisk + this.data.FreightCost;
        this.data.ConfirmPriceWithRate = this.data.ConfirmPrice * this.data.RateDollar.Rate;
        let CMT_Price = 0;
        if (this.data.CostCalculationGarment_Materials) {
            this.data.CostCalculationGarment_Materials.forEach(item => {
                CMT_Price += Number(item.CMT_Price);
            })
        }
        let FOB_Price = this.data.ConfirmPrice + CMT_Price;
        this.data.FOB_Price = US + numeral(FOB_Price).format();
        this.data.CMT_Price = US + numeral(CMT_Price).format();
        this.data.CNF_Price = US + numeral(0).format();
        this.data.CIF_Price = US + numeral(0).format();
        this.data.priceInfo = [
            { FOB_Price: this.data.FOB_Price, CMT_Price: this.data.CMT_Price, CNF_Price: this.data.CNF_Price, CIF_Price: this.data.CIF_Price }
        ]
        this.data.Freight = US + numeral(this.data.Freight).format();
        this.data.Insurance = US + numeral(this.data.Insurance).format();
        this.data.ConfirmPrice = US + numeral(this.data.ConfirmPrice).format();
        this.data.SMV_Cutting = numeral(this.data.SMV_Cutting).format();
        this.data.SMV_Sewing = numeral(this.data.SMV_Sewing).format();
        this.data.SMV_Finishing = numeral(this.data.SMV_Finishing).format();
        this.data.SMV_Total = numeral(this.data.SMV_Total).format();
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
