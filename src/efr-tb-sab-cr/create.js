import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {
    
    constructor(router, service) {
        this.router = router;
        this.service = service; 
        this.data = { items: [] };
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() { 
        console.log("1");
        this.service.create(this.data)
            .then(result => {
                console.log("2");
                this.list();
            })
            .catch(e => {
                this.error = e;
            })
    } 
}