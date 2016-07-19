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

    save(code) {
        if (code ==undefined)
        {
             alert(`Kode harus diisi`);
        }else
        {
        console.log(JSON.stringify(this.data));
        this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                console.warn(e);
            })
        }
    } 
}
 