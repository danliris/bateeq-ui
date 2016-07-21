import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service'; 

// import {NewInstance} from 'aurelia-dependency-injection';
// import {ValidationController, validateTrigger} from 'aurelia-validation';
// import {ValidationRules, required} from 'aurelia-validatejs'
// import {Validator} from 'aurelia-validatejs'; 

@inject(Router, Service)
// @inject(Router, Service, NewInstance.of(ValidationController))
export class Create { 
    
    constructor(router, service) {
    // constructor(router, service, validationController) {
        this.router = router;
        this.service = service;
        this.data = {}; 

        // this.validationController = validationController;
        // console.log(this.validationController);
        // this.validationController.validateTrigger = validateTrigger.manual;
        // this.rules = ValidationRules
        //     .ensure('code').required().length({minimum:3, maximum:5})
        //     .ensure('name').required().length({minimum:3, maximum:5}).on(this.data);
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() { 
        // let errors = this.validationController.validate();
        // console.log(errors)
        this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                console.warn(e);
            })
    }
}
