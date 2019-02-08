import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    packingList = '';
    password = '';
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.printStruk = "";
    }

    activate(params) {
        var id = params.id;
        this.service.getById(id)
            .then(data => {
                this.data = data;
                this.service.getSPKByReference(data.code)
                    .then(spk => {
                        if (spk != undefined && spk.length > 0) {
                            this.password = spk[0].password;
                            this.packingList = spk[0].packingList;
                        }
                    }).catch(e => {
                    })
                this.generatePrintStrukTable();
            })
    }

    list() {
        this.router.navigateToRoute('list');
    }

    print() {
        window.print();
    }

    generatePrintStrukTable() {
        var totalItem = 0;
        var totalPrice = 0;
        this.service.getSPKByReference(this.data.code)
            .then(spk => {
                this.printStruk = "";
                this.printStruk += "<table style='width:100%;'>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'><b>PT EFRATA RETAILINDO </b> </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'><b> Kel. Banaran, Kec. Grogol, Kab. Sukoharjo 57193  </b></td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'><b> Jawa Tengah, Indonesia </b> </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'><b>TRANSFER STOK </b><br/></td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'>";
                this.printStruk += "            <div class='col-xs-5'> Nomor Packing List </div>";
                this.printStruk += "            <div class='col-xs-7'> " + spk[0].packingList + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'>";
                this.printStruk += "            <div class='col-xs-5'> Password </div>";
                this.printStruk += "            <div class='col-xs-7'> " + spk[0].password + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'>";
                this.printStruk += "            <div class='col-xs-5'> Tanggal </div>";
                this.printStruk += "            <div class='col-xs-7'> " + (this.data._createdDate).substring(0, 10) + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'>";
                this.printStruk += "            <div class='col-xs-5'> Kasir </div>";
                this.printStruk += "            <div class='col-xs-7'> " + this.data._createdBy + " </div>";
                this.printStruk += "        </td>";

                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'>";
                this.printStruk += "            <div class='col-xs-5'> Sumber </div>";
                this.printStruk += "            <div class='col-xs-7'> " + this.data.source.code + "-" + this.data.source.name + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr>";
                
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'>";
                this.printStruk += "            <div class='col-xs-5'> Tujuan </div>";
                this.printStruk += "            <div class='col-xs-7'> GDG.01-GUDANG BARANG JADI 1 </div>";
                //this.printStruk += "            <div class='col-xs-7'> " + this.data.source.code + "-" + this.data.source.name + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr>";
                
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'>";
                this.printStruk += "            <div class='col-xs-5'> Keterangan </div>";
                this.printStruk += "            <div class='col-xs-7'> " + "Transfer ke " + this.data.destination.code + "-" + this.data.destination.name + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'> ==================================== </td>";
                this.printStruk += "    </tr>";

                for (var item of this.data.items) {
                    this.printStruk += "    <tr>";
                    this.printStruk += "        <td class='text-left' style='padding-right:6pt'> " + item.item.code + " </td>";
                    this.printStruk += "        <td colspan='2' class='text-left'> " + item.item.name + " </td>";
                    this.printStruk += "    </tr>";
                    this.printStruk += "    <tr>";
                    this.printStruk += "        <td class='text-left' style='padding-right:6pt'> " + item.quantity.toLocaleString() + " X &nbsp; </td>";
                    this.printStruk += "        <td class='text-left'> " + (item.item.domesticSale).toLocaleString() + " </td>";
                    this.printStruk += "        <td class='text-right'> " + (item.item.domesticSale * item.quantity).toLocaleString() + " </td>";
                    this.printStruk += "    </tr>";
                    this.printStruk += "    <tr>";
                    this.printStruk += "        <td class='text-left' style='padding-right:6pt'> " + item.remark + " </td>";
                    this.printStruk += "    </tr>";
                    totalItem += item.quantity;
                    totalPrice += (item.item.domesticSale * item.quantity);
                }
                this.printStruk += "    <tr>";
                this.printStruk += "        <td colspan='3' class='text-left'> ==================================== </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td class='text-left' style='padding-right:6pt'>  Total Item:  </td>";
                this.printStruk += "        <td colspan='2' class='text-left'> " + totalItem + " </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr>";
                this.printStruk += "        <td class='text-left' style='padding-right:6pt'> Grand Total: </td>";
                this.printStruk += "        <td colspan='2' class='text-left'> " + totalPrice.toLocaleString() + " </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "</table>";
            }).catch(e => {
            })

    }

} 