import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {
    
    constructor(router, service) {
        this.router = router;
        this.service = service; 
        this.data = { items: [] };
        this.packingList = "";
    }

    activate(params) {
        if(params.id!=undefined){
            this.service.getPendingSPKById(params.id)
            .then(data => {
                    data.password = "";
                    data._id = undefined;
                    this.data = data;
                    data.reference = data.packingList;
                })
            .catch()
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() { 
        this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                this.error = e;
            })
    } 
}
