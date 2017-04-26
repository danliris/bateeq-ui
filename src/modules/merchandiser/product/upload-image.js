import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var FinishedGoodsLoader = require('../../../loader/finished-goods-loader');


@inject(Router, Service)
export class Upload {
    @bindable data;
    @bindable error;
    contacts = [];

    productFilter = {};
    product;

    dataSource = [];
    dataDestination = [];
    article_motif = {};
    article_colors = [];
    article_color = {};

    color = "#FF0000";

    ro = "";

    columns = [
        { header: "", value: "check" },
        { header: "Code", value: "code" },
        { header: "Name", value: "name" }
    ]

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { items: [] };
        this.isNotRO = false;
        this.isNotName = true;

        this.service.getColors()
            .then(result => {
                this.article_colors = result.data.data;
                if (this.article_colors.length > 0)
                    this.article_color = this.article_colors[0];
                this.article_colors.forEach((s) => {
                    s.toString = function () {
                        return s.name;
                    }
                });
            })
    }

    controlOptions = {
        label: {
            length: 2,
            align: "right"
        },
        control: {
            length: 6
        }
    }

    loaderSource = (info) => {
        return this.dataSource;
    }

    check(e) {
        if (e.keyCode == 13) {
            this.service.searchByRo(this.ro)
                .then((result) => {
                    this.deleteAll();
                    this.dataSource = result;
                    if (result) {
                        var firstResult = result[0];
                        this.service.getMotif(firstResult.code.substring(9, 11))
                            .then((motif) => {
                                if (motif) {
                                    this.article_motif = motif.data;
                                }
                            })
                    }
                })
            return false;
        } else {
            return true;
        }
    }

    updateType(e) {
        this.deleteAll();
        var type = e.target.value;
        this.isNotRO = type != "ro";
        this.isNotName = type != "name";

        if (this.isNotRO)
            this.ro = "";
        if (this.isNotName)
            this.name = "";
    }

    get finishedGoodsLoader() {
        return FinishedGoodsLoader;
    }

    finishedGoodsChange(e) {
        this.clearTable();
        this.dataSource.push(this.product);
        this.service.getMotif(this.product.code.substring(9, 11))
            .then((motif) => {
                if (motif) {
                    this.article_motif = motif.data;
                }
            })
    }

    changeColor(e) {
        console.log(e);
    }

    deleteAll() {
        this.clearTable();
    }

    moveRight() {
        var filter = this.dataSource.filter(function (item) {
            return item.check
        });

        this.dataDestination = this.dataDestination.concat(filter);

        var temp = this.dataSource;
        for (var item of filter) {
            var i = this.dataSource.indexOf(item);
            if (i != -1) {
                temp.splice(i, 1);
            }
        }
        this.dataSource = [].concat(temp);
    }


    moveLeft() {
        var filter = this.dataDestination.filter(function (item) {
            return item.check
        });

        this.dataSource = this.dataSource.concat(filter);

        var temp = this.dataDestination;
        for (var item of filter) {
            var i = this.dataDestination.indexOf(item);
            if (i != -1) {
                temp.splice(i, 1);
            }
        }
        this.dataDestination = [].concat(temp);
    }

    clearTable() {
        this.dataSource = [];
        this.dataDestination = [];
        this.article_motif = {};
    }

    activate(params) {

    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }

    list() {
        this.router.navigateToRoute('list');
    }

    upload() {
        var e = [];
        var imageUpload = document.getElementById("imageUpload");
        var fileList1 = imageUpload.files;

        var motifUpload = document.getElementById("motifUpload");
        var fileList2 = motifUpload.files;

        if (fileList1[0] == undefined)
            e["imageUpload"] = "Gambar harus dipilih"

        if (fileList2[0] == undefined)
            e["motifUpload"] = "Gambar motif harus dipilih"

        if (this.dataDestination.length == 0) {
            e["dataDestination"] = "Produk harus dipilih"
            if (this.dataSource.length == 0) {
                e["dataSource"] = "Tidak ada produk ditemukan"
            }
        }

        if (Object.keys(e).length > 0) {
            this.error = e;
        } else {
            var formData = new FormData();
            formData.append("imageUpload", fileList1[0]);
            formData.append("motifUpload", fileList2[0]);

            // console.log(formData);
            var endpoint = 'upload/image';
            var request = {
                method: 'POST',
                headers: {
                },
                data: {
                    "products": this.dataDestination,
                    "color": this.color,
                    "article-color": this.article_color
                },
                body: formData
            };
            var promise = this.service.endpoint.client.fetch(endpoint, request)
            this.service.publish(promise);
            return promise.then(response => {
                this.service.publish(promise);
                if (response) {
                    return response.json().then(result => {
                        var data = {}
                        data.products = this.dataDestination;
                        data.colorCode = this.color;
                        data.articleColor = this.article_color;
                        data.imagePath = result.data[0];
                        data.motifPath = result.data[1];
                        this.service.updateProductImage(data)
                            .then(result2 => {
                                this.list();
                            }).catch(e => {
                                this.error = e;
                            });
                    });
                } else {
                    return Promise.resolve({});
                }

            })
        }

    }

    list() {
        this.router.navigateToRoute('list');
    }
}
