// import {inject, bindable} from 'aurelia-framework';
// import {ValidationRules, required} from 'aurelia-validatejs'
// import {Validator} from 'aurelia-validatejs';

export class DataForm {
    @bindable data = {};

    constructor() {

        // this.rules = ValidationRules
        //     .ensure('code')
        //         .required()
        //         .length({ minimum: 3, maximum: 5 })
        //     .ensure('name')
        //         .required()
        //         .length({ minimum: 3, maximum: 5 })
        //     .on(this.data);
    }

    activate() {
    }

    attached() {
    }
} 