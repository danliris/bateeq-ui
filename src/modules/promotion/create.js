import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {

    }
    
    bind() {
        this.data = {};
        this.error = {};
        this.voucherTypeList=[
            "Percentage", 
            "Nominal",
            "Buy n free m", 
            "Buy n discount m%", 
            "Buy n discount m% product (n)th",
            "Pay nominal Rp.xx, Free 1 product"
        ];

        this.categorySourcesList = [
            "Product",
            "Category"
        ];
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    checkZero(data){
        if(data.length == 1){
          data = "0" + data;
        }
        return data;
      }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    save(event) {
        
        console.log(this.storage);
        console.log(this.data);
        console.log(this);

        var startDateDate = new Date(this.data.startDate);
        this.data.startDate =startDateDate.getDate().toString().padStart(2,'0')+'/'+startDateDate.getMonth().toString().padStart(2,'0')+'/'+startDateDate.getFullYear()

        var endDateDate = new Date(this.data.endDate);
        this.data.endDate = endDateDate.getDate().toString().padStart(2,'0')+'/'+endDateDate.getMonth().toString().padStart(2,'0')+'/'+endDateDate.getFullYear()

        this.data.description = this.description;

        this.service.create(this.data)
            .then(result=> {
                console.log("masuk then")
                if (this.isEmpty(result)) {
                    console.log(result.data);
                        alert("Lengkapi kembali Form dengan tanda bintang");
                }else{
                console.log(result);
                alert("Voucher berhasil di update");
                }
            })
            .catch(e=>{
                console.log("masuk catch");
                console.log(e);
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                }
                else if (e.statusCode == 400) {
                    console.log("masuk 400");
                    console.log(e.data);
                        alert("Lengkapi kembali Form dengan tanda bintang");
                } else {
                    this.error = e;
                }
            });

        // this.service.create(this.ata)
        // this.service.create(this.data)
        //     .then(result => {
        //         alert("Data berhasil dibuat");
        //         this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
        //     })
        //     .catch(e => {
        //         if (e.statusCode == 500) {
        //             alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
        //         } else {
        //             this.error = e;
        //         }
        //     })
    }

    delete(event){
        console.log(event);
    }

    parseToReq(args){
        var result={};
        var typeVoucher = args.voucherType? args.voucherType.toLowerCase(): "";
        switch(typeVoucher)
        {
            case "percentage":
            break;
            case "nominal":
            break;
            case "buy n free m":
            break;
            case "buy n discount m%":
            break;
            case "buy n discount m% product (n)th":
            break;
            case "pay nominal rp.xx, free 1 product":
            break;
            default:
            break;
        }
    }
}