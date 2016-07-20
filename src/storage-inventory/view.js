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
        var storageId = params.storageId;
        var articleVariantId = params.articleVariantId; 
        
        this.service.getAllMovement(storageId, articleVariantId)
        .then(data=>{
            this.data = data;  
            var moment = require('moment');
            for(var obj of this.data) {  
                //2016-07-19T08:04:09.676Z
                obj.date = moment(obj.date, "YYYY-MM-DDTHH:mm:SSSZ").format("DD MMM YYYY - HH:mm:SS")
            }   
        })
    }

    list()
    {
        this.router.navigateToRoute('list');
    }
}
