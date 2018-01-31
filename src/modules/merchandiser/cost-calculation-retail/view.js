import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

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

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.STD_Hour = this.data.SH_Cutting + this.data.SH_Sewing + this.data.SH_Finishing;
    }

    async bind(context){
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
