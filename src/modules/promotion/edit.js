import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import { moment } from 'moment';

@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    isEdit = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    save(event) {
        var startDateDate = new Date(this.data.startDate);
        this.data.startDate =startDateDate.getDate().toString().padStart(2,'0')+'/'+(startDateDate.getMonth()+1).toString().padStart(2,'0')+'/'+startDateDate.getFullYear()

        var endDateDate = new Date(this.data.endDate);
        this.data.endDate = endDateDate.getDate().toString().padStart(2,'0')+'/'+(endDateDate.getMonth()+1).toString().padStart(2,'0')+'/'+endDateDate.getFullYear()

        // this.data.description = this.description;

        this.service.edit(this.data)
            .then(result=> {
                console.log("masuk then")
                console.log(result);
                var isempty = this.isEmpty(result);
                console.log(isempty);
                if (isempty) {
                    // console.log(result.data);
                    alert("Lengkapi kembali Form dengan tanda bintang");
                } else {
                    // console.log(result);
                    alert("Voucher berhasil di update");
                    this.router.navigateToRoute('list', {}, { replace: true, trigger: true });
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
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        if (obj == undefined)
            return false;

        return true;
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
