import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service, ServiceMembership} from './service';

@inject(Router, Service, ServiceMembership)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service, serviceMembership) {
        this.router = router;
        this.service = service;
        this.serviceMembership = serviceMembership;
    }

    async activate(params) {
        let id = params.id;
        console.log(this)

        this.data = await this.service.getById(id);
        this.voucherType = this.data.voucherType;

        await this.serviceMembership.getListMembership({})
            .then(result => {
                this.assignToMembership = result.map(s => {
                    return {
                        label: s.name,
                        value: s.id,
                        checked: false
                    }
                });
            });

        if (this.data.voucherType.toLowerCase() == 'product' && this.data.productGift.length > 0) {
            this.isProduct = true;
            this.data.productGift = this.data.productGift[0].split(',').map(x => {
                return {
                    id: x,
                    name: x
                }
            });
            this.productGift = this.data.productGift;
        }

        if (this.data.assignToMember && this.data.assignToMember.length > 0)
            this.assignToMembership = this.assignToMembership.map(x => {
                if (this.data.assignToMember[0].split(',').find(y => y == x.value))
                    x.checked = true
                return x
            })
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save(event) {
        alert("belum ada endPoint edit");
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
