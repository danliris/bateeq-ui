import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


var Itemloader = require('../../loader/finished-goods-loader')
@inject(Router, Service)
export class List { 
    total;
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.filter = "";  
    }

get itemLoader()
{
    return Itemloader;
}

itemView =(items) =>{
    return `${items.code}`-`${items.name}`
}


    async activate() { 
    }

    reloadItem() { 
        this.total=0;
        this.itemId= this.item ? this.item._id :"";
        this.service.getAllInventorybyItemId(this.itemId)
            .then(data => {
                this.data = data;
                for (var item of this.data)
                {
                    this.total=this.total+item.quantity;
                }
            })
    }
}
