import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        // this.data = {
        //     id: 1,
        //     voucherType: 'Percentage',
        //     percentage: 10,
        //     maxDiscount: 10000,
        //     nominal: 10000,
        //     minimumPayment: 10000,
        //     appliesMultiply: true,
        //     qtyItemPruchase: 10,
        //     qtyItemGift: 1,
        //     productPurchase: 'Baju A',
        //     productGift: 'Baju B',
        //     assignToCategory: 'Man',
        //     categoryPurchase: 'Man',
        //     discountPercentage: 10,
        //     discountName: 'Batik Day',
        //     discountCode: 'BatikDay',
        //     discountType: 'Percentage',
        //     totalUse: 30,
        //     status: 'Active',
        //     quantityVoucher: 100,
        //     maxUsagePerUser: 2,
        //     startDate: '03-10-2020',
        //     endDate: '03-11-2020',
        //     description: 'description vocher'
        // }
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save(event) {
        // this.service.create(this.data)
        //     .then(result => {
        //         alert("Voucher berhasil di update");
        //         this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
        //     })
        //     .catch(e => {
        //         if (e.statusCode == 500) {
        //             alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
        //         } else {
        //             this.error = e;
        //         }
        //     })
        console.log(this.storage);
        console.log(this.data);
        console.log(this);

        var startDateDate = this.data.startDate;
        console.log(startDateDate.toString());
        this.data.startDate =startDateDate.getDate().toString().padStart(2,'0')+'/'+(startDateDate.getMonth()+1).toString().padStart(2,'0')+'/'+startDateDate.getFullYear()

        var endDateDate = new Date(this.data.endDate);
        // console.log(startDateDate);
        this.data.endDate = endDateDate.getDate().toString().padStart(2,'0')+'/'+(endDateDate.getMonth()+1).toString().padStart(2,'0')+'/'+endDateDate.getFullYear()

        this.data.description = this.description;

        this.service.put(this.data)
            .then(result=> {
                console.log("masuk then")
                console.log(result);
                var isempty = this.isEmpty(result);
                console.log(isempty);   
                if (isempty) {
                    // console.log(result.data);
                        alert("Lengkapi kembali Form dengan tanda bintang");
                }else{
                // console.log(result);
                alert("Voucher berhasil di update");
                this.router.navigateToRoute('list',{}, { replace: true, trigger: true });
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
    }
    // cancelCallback(event) {
    //     this.router.navigateToRoute('view', { id: this.data.Id });
    // }

    // saveCallback(event) {
    //     this.service.update(this.data)
    //         .then(result => {
    //             this.router.navigateToRoute('view', { id: this.data.Id });
    //         })
    //         .catch(e => {
    //             this.error = e;
    //         })
    // }
}
