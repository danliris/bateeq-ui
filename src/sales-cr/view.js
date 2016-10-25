import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate(params) {
        var id = params.id;
        this.service.getById(id)
        .then(data=>{
            this.data = data;
            this.checkPaymentType();
        })
    }

    list()
    {
        this.router.navigateToRoute('list');
    } 
    
    checkPaymentType() {
        this.isCard = false;
        this.isCash = false;   
        var paymentType = this.data.salesDetail.paymentType; 
        if(paymentType.toLowerCase() == 'cash'){  
            this.isCash = true;
        }
        else if(paymentType.toLowerCase() == 'card'){  
            this.isCard = true;
        }
        else if(paymentType.toLowerCase() == 'partial'){  
            this.isCard = true;
            this.isCash = true;
        }  
    }
    
}
