import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


var ItemLoader = require('../../loader/finished-goods-loader')
@inject(Router, Service)
export class List { 
    total;
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.filter = "";  
    }

get itemloader()
{
    return ItemLoader;
}

itemView =(items) =>{
    return `${items.name}`
}


    async activate() { 
    }

    reloadItem() { 
        this.total=0;
        this.itemCode= this.item ? this.item.code :"";
        this.service.getAllInventorybyItemId(this.itemCode)
            .then(data => {
                this.data = data;
                for (var item of this.data)
                {
                    this.total=this.total+item.Quantity;
                }
            })
    }
}
