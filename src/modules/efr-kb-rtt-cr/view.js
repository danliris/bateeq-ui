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
                const jobs = [this.service.getSPKByReference(data.code), this.service.getPackingListTransferStock(data.code)];
                Promise.all(jobs)
                    .then(result => {
                        const spk = result[0];
                        const packingListTransferStock = result[1];
                        if (spk != undefined && spk.length > 0) {
                            this.password = spk[0].password;
                            this.packingList = spk[0].packingList;
                        }
                        if (packingListTransferStock) {
                            if (packingListTransferStock[0].source.code == packingListTransferStock[1].destination.code) {
                                this.tujuan = packingListTransferStock[0].source;
                            } else if (packingListTransferStock[0].destination.code == packingListTransferStock[1].source.code) {
                                this.tujuan = packingListTransferStock[0].destination;
                            }
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
                //OLD
                // this.printStruk = "";
                // this.printStruk += "<table style='width:100%;'>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'><b>PT EFRATA RETAILINDO </b> </td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'><b> Kel. Banaran, Kec. Grogol, Kab. Sukoharjo 57193  </b></td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'><b> Jawa Tengah, Indonesia </b> </td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'><b>TRANSFER STOK </b><br/></td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'>";
                // this.printStruk += "            <div class='col-xs-5'> Nomor Packing List </div>";
                // this.printStruk += "            <div class='col-xs-7'> " + spk[0].packingList + " </div>";
                // this.printStruk += "        </td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'>";
                // this.printStruk += "            <div class='col-xs-5'> Password </div>";
                // this.printStruk += "            <div class='col-xs-7'> " + spk[0].password + " </div>";
                // this.printStruk += "        </td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'>";
                // this.printStruk += "            <div class='col-xs-5'> Tanggal </div>";
                // this.printStruk += "            <div class='col-xs-7'> " + (this.data._createdDate).substring(0, 10) + " </div>";
                // this.printStruk += "        </td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'>";
                // this.printStruk += "            <div class='col-xs-5'> Kasir </div>";
                // this.printStruk += "            <div class='col-xs-7'> " + this.data._createdBy + " </div>";
                // this.printStruk += "        </td>";

                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'>";
                // this.printStruk += "            <div class='col-xs-5'> Sumber </div>";
                // this.printStruk += "            <div class='col-xs-7'> " + this.data.source.code + "-" + this.data.source.name + " </div>";
                // this.printStruk += "        </td>";
                // this.printStruk += "    </tr>";
                
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'>";
                // this.printStruk += "            <div class='col-xs-5'> Tujuan </div>";
                // //this.printStruk += "            <div class='col-xs-7'> GDG.05-GUDANG TRANSFER STOCK </div>";
                // // this.printStruk += "            <div class='col-xs-7'> GDG.01-GUDANG BARANG JADI 1 </div>";
                // this.printStruk += "            <div class='col-xs-7'> " + this.tujuan.code + "-" + this.tujuan.name + " </div>";
                // this.printStruk += "        </td>";
                // this.printStruk += "    </tr>";
                
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'>";
                // this.printStruk += "            <div class='col-xs-5'> Keterangan </div>";
                // this.printStruk += "            <div class='col-xs-7'> " + "Transfer ke " + this.data.destination.code + "-" + this.data.destination.name + " </div>";
                // this.printStruk += "        </td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'> ==================================== </td>";
                // this.printStruk += "    </tr>";

                // for (var item of this.data.items) {
                //     this.printStruk += "    <tr>";
                //     this.printStruk += "        <td class='text-left' style='padding-right:6pt'> " + item.item.code + " </td>";
                //     this.printStruk += "        <td colspan='2' class='text-left'> " + item.item.name + " </td>";
                //     this.printStruk += "    </tr>";
                //     this.printStruk += "    <tr>";
                //     this.printStruk += "        <td class='text-left' style='padding-right:6pt'> " + item.quantity.toLocaleString() + " X &nbsp; </td>";
                //     this.printStruk += "        <td class='text-left'> " + (item.item.domesticSale).toLocaleString() + " </td>";
                //     this.printStruk += "        <td class='text-right'> " + (item.item.domesticSale * item.quantity).toLocaleString() + " </td>";
                //     this.printStruk += "    </tr>";
                //     this.printStruk += "    <tr>";
                //     this.printStruk += "        <td class='text-left' style='padding-right:6pt'> " + item.remark + " </td>";
                //     this.printStruk += "    </tr>";
                //     totalItem += item.quantity;
                //     totalPrice += (item.item.domesticSale * item.quantity);
                // }
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td colspan='3' class='text-left'> ==================================== </td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td class='text-left' style='padding-right:6pt'>  Total Item:  </td>";
                // this.printStruk += "        <td colspan='2' class='text-left'> " + totalItem + " </td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "    <tr>";
                // this.printStruk += "        <td class='text-left' style='padding-right:6pt'> Grand Total: </td>";
                // this.printStruk += "        <td colspan='2' class='text-left'> " + totalPrice.toLocaleString() + " </td>";
                // this.printStruk += "    </tr>";
                // this.printStruk += "</table>";

                //END OLD

                this.printStruk = "";
                
                this.printStruk += "<div class='row'>";
                this.printStruk += "    <div class='col-xs-12'>";
                this.printStruk += "        <address>";
                this.printStruk += "            <b>PT EFRATA RETAILINDO </b>";
               
                this.printStruk += "            </br> <b> Kel. Banaran, Kec. Grogol, Kab. Sukoharjo 57193  </b> ";
              
                this.printStruk += "            </br> <b> Jawa Tengah, Indonesia </b>";
            
                this.printStruk += "            </br> <b>TRANSFER STOK </b><br/>";
                this.printStruk += "        </address>";
                this.printStruk += "    </div>";

                this.printStruk += "    <div class='col-xs-12'>";

                this.printStruk += "        <div class='row' >";  
                this.printStruk += "            <div class='col-xs-4'> Nomor Packing List </div>";
                this.printStruk += "            <div class='col-xs-8'> " + spk[0].packingList + " </div>";
                this.printStruk += "        </div>";

                this.printStruk += "        <div class='row' >";
                this.printStruk += "            <div class='col-xs-4'> Password </div>";
                this.printStruk += "            <div class='col-xs-8'> " + spk[0].password + " </div>";
                this.printStruk += "        </div>";

                this.printStruk += "        <div class='row' >";
                this.printStruk += "            <div class='col-xs-4'> Tanggal </div>";
                this.printStruk += "            <div class='col-xs-8'> " + (this.data._createdDate).substring(0, 10) + " </div>";
                this.printStruk += "        </div>";

                this.printStruk += "        <div class='row' >";
                this.printStruk += "            <div class='col-xs-4'> Kasir </div>";
                this.printStruk += "            <div class='col-xs-8'> " + this.data._createdBy + " </div>";
                this.printStruk += "        </div>";
                this.printStruk += "    </div>";

                this.printStruk += "</div>";


                this.printStruk += "<div class='row'>";
                this.printStruk += "    <div class='col-xs-12'>";
                this.printStruk += "        <div class='row' >";
                this.printStruk += "            <div class='col-xs-4'> Sumber </div>";
                this.printStruk += "            <div class='col-xs-8'> " + this.data.source.code + "-" + this.data.source.name + " </div>";
                this.printStruk += "        </div>";


                this.printStruk += "        <div class='row' >";
                this.printStruk += "            <div class='col-xs-4'> Tujuan </div>";
                this.printStruk += "            <div class='col-xs-8'> " + this.tujuan.code + "-" + this.tujuan.name + " </div>";
                this.printStruk += "        </div>";

                this.printStruk += "        <div class='row' >";
                this.printStruk += "            <div class='col-xs-4'> Keterangan </div>";
                this.printStruk += "            <div class='col-xs-8'> " + "Transfer ke " + this.data.destination.code + "-" + this.data.destination.name + " </div>";
                this.printStruk += "        </div>";
                this.printStruk += "    </div>";

                this.printStruk += "</div>";

                this.printStruk += "        <div class='row' >";
                this.printStruk += "           <div class='col-xs-12'>============================================================</div>";
                
                this.printStruk += "        </div>";

                

                for (var item of this.data.items) {
                
                this.printStruk += "        <div class='row' style='margin-bottom:10px;' >";
                this.printStruk += "            <div class='col-xs-4 '>" + item.item.code + "</div>";
                this.printStruk += "            <div class='col-xs-8 '>" + item.item.name + "</div>";
                this.printStruk += "            <div class='col-xs-4 '>"  + item.quantity.toLocaleString() +  " X &nbsp;</div>";
                this.printStruk += "            <div class='col-xs-4 '>" + (item.item.domesticSale).toLocaleString() + "</div>";
                this.printStruk += "            <div class='col-xs-4 '>"  + (item.item.domesticSale * item.quantity).toLocaleString() + "</div>";
                this.printStruk += "            <div class='col-xs-12 '>" + item.remark +  "</div>";
                this.printStruk += "        </div>";
                totalItem += item.quantity;
                totalPrice += (item.item.domesticSale * item.quantity);
                }

                this.printStruk += "        <div class='row' >";
                this.printStruk += "            <div class='col-xs-12'>============================================================</div>";           
                this.printStruk += "        </div>";

                this.printStruk += "        <div class='row' >";
                this.printStruk += "            <div class='col-xs-4'>Total Item</div>";
                this.printStruk += "            <div class='col-xs-8'>"+ totalItem +"</div>";
                this.printStruk += "            <div class='col-xs-4'>Grand Total</div>";
                this.printStruk += "            <div class='col-xs-8'>"+ totalPrice.toLocaleString() +"</div>";             
                this.printStruk += "        </div>";

              


            }).catch(e => {
            })

    }

} 