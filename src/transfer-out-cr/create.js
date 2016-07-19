import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create { 
    qty1=0;
    qty2=0;
    
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
        var qty1=document.getElementById("quantity1").value;
        var qty2=document.getElementById("quantity2").value;
        if (code ==undefined)
        {
             alert(`Kode harus diisi`);
        }else if (qty1==0)
        {
             alert(`Tidak dapat menyimpan data karena ada produk yang tidak memiliki stok`);
        }else if (qty2>qty1)
        {
             alert(`Tidak dapat menyimpan data karena ada pengiriman produk yang melebihi stok`); 
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
