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
        //console.log(this.item);
        this.itemCode= this.item ? this.item.code :"";
        //console.log(this.itemCode)
        this.service.getAllInventorybyItemId(this.itemCode)
            .then(data => {
                //console.log(data);
                this.data = data;
                for (var item of this.data)
                {
                    this.total=this.total+item.Quantity;
                }
            })
    }
}
