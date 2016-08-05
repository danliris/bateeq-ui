import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    storages = [];
    @bindable quantity = 0;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    attached() {
        this.service.getByCode("EFR-KB/FNG")
            .then(data => {
                var dataOutFirst = data[0];
                var id = dataOutFirst.config.source.value;
                this.service.getAllStorageById(id)
                    .then(dataStorage => {
                        this.data.sourceId = dataStorage._id;
                        this.data.source = dataStorage.name;
                    })
            })
            .catch(e => {
                alert('Fill Configuration in Module');
            })
    }

    addItem() {
        var item = {};
        item.articleVariantId = '';
        this.data.items.push(item);
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
    search() {
        this.service.getOutByCode(this.data.reference)
            .then(dataOut => {
                var dataOutFirst = dataOut[0];
                this.data.sourceId = dataOutFirst.config.source.value
            })
            .catch(e => {
                alert('Referensi Keluar tidak ditemukan');
            })
    }
}
