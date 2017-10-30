import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from "../service";
import { CoreService } from "../core-service";
const DesignerLoader = require('../../../loader/account-loader');
const CategoryLoader = require('../../../loader/category-loader');
const SeasonLoader = require('../../../loader/season-loader');
const MaterialCompositionLoader = require('../../../loader/material-composition-loader');
const SubCounterLoader = require('../../../loader/sub-counter-loader');
const MaterialLoader = require('../../../loader/material-loader');

@inject(DialogController, Service, CoreService)
@useView("./design-form-view.html")
export class DesignFormView {
    constructor(controller, service, coreService) {
        this.controller = controller;
        this.service = service;
        this.coreService = coreService;
        this.data = {};
        this.error = {};

        this.stageData = [];
    }

    async activate(params) {
        this.type = params.type;

        if (this.type == "Add") {
            this.stageData = params.stages;
        }
        else {
            this.isEdit = true;

            await this.service.getDesignById(params.id)
                .then((result) => {
                    this.data = result;
                });

            this.data.stage = params.stageName;
        }
    }

    get designerLoader(){
        return DesignerLoader;
    }

    designerView = (designer) => {
        return `${designer.profile.firstname} ${designer.profile.lastname}`;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    get seasonLoader() {
        return SeasonLoader;
    }

    get materialCompositionLoader() {
        return MaterialCompositionLoader;
    }

    get subCounterLoader() {
        return SubCounterLoader;
    }

    get materialLoader() {
        return MaterialLoader;
    }

    save() {
        this.error = {};

        this.data.amount = this.data.amount || 0;
        debugger

        if (this.type == "Add") {
            this.data.stageId = this.data.stage._id;

            this.service.createDesign(this.data)
                .then((result) => {
                    this.controller.ok();
                })
                .catch(e => {
                    this.error = e;
                });
        }
        else {
            this.service.updateDesign(this.data)
                .then((result) => {
                    this.controller.ok();
                })
                .catch(e => {
                    this.error = e;
                });
        }
    }
}