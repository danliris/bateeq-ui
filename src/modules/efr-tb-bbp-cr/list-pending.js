import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var tranferOutLoader = require('../../loader/transfer-out-loader');


@inject(Router, Service)
export class Pending {
    data = [];
    info = {
      page: 1,
      keyword: '',
      filter: JSON.stringify ({
        "IsReceived": false
      })
    };
    keyword = '';
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    // activate() {
    //     this.service.listPending()
    //         .then(data => {
    //             this.data = data;
    //         })
    // }

    async activate() {
        this.info.keyword = '';
        var result = await this.service.listPending(this.info);
        console.log(result.data);
        var resultWithReference = await result.data.map(item => {

            item["sourceReference"] = "";
            item["destinationReference"] = "";
            //console.log(item.reference);
            if (item.reference) { //r R
                var referenceData = tranferOutLoader(item.reference); //r R

                Promise.all([referenceData]).then(dataResult => {
                    var data = dataResult[0];
                    data.forEach(element => {
                        item.sourceReference = element.source.name;
                        item.destinationReference = element.destination.name;
                    });
                });
            }
            return item;
        });
        this.data = resultWithReference;
        this.info = result.info;
    }

    loadPage() {
        var keyword = this.info.keyword;
        this.service.listPending(this.info)
            .then(result => {
                console.log(result.data);
                var resultWithReference = result.data.map(item => {

                    item["sourceReference"] = "";
                    item["destinationReference"] = "";

                    if (item.reference) { //r R
                        var referenceData = tranferOutLoader(item.reference); //r R

                        Promise.all([referenceData]).then(dataResult => {
                            var data = dataResult[0];
                            data.forEach(element => {
                                item.sourceReference = element.source.name;
                                item.destinationReference = element.destination.name;
                            });
                        });
                    }
                    return item;
                });
                this.data = resultWithReference;
                this.info = result.info;
                this.info.keyword = keyword;
            })
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    accept(data) {
        this.router.navigateToRoute('create', { id: data._id })
    }

    create(view) {
        this.router.navigateToRoute('create');
    }
}
