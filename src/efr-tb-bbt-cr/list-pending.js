import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Pending {
    data = [];
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate() {
        this.service.listPending()
            .then(data => {
                this.data = data;
            })
    }

    accept(data){
        this.router.navigateToRoute('create',{ id: data._id })
    }
    
    create(view) {
        this.router.navigateToRoute('create');
    }
}