import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;
  hascancelConfirm = false;
  hasConfirm = false;
  hasMasterPlan = false;
  expireBooking=false;

  constructor(router, service) {
    this.router = router;
    console.log(this.router);
    this.service = service;
    console.log(this.service);
  }

  async activate(params) {
      console.log(params);
      var id = params.id;
      this.data = await this.service.getById(id);
      console.log(this.data);
     
      if(this.data.CanceledQuantity > 0 || this.data.ExpiredBookingQuantity > 0){
        this.beginingOrderQuantity = this.data.OrderQuantity + this.data.ExpiredBookingQuantity + this.data.CanceledQuantity;
      }
      this.selectedSection = { Code:this.data.SectionCode, Name:this.data.SectionName,};
      this.selectedBuyer = { Code:this.data.BuyerCode, Name:this.data.BuyerName,};
      
      var today = new Date();
      today.setDate(today.getDate()+40);
      var deliveryDates = new Date(Date.parse(this.data.DeliveryDate));
      if(this.data.ConfirmedQuantity === 0 && deliveryDates > today && this.data.HadConfirmed === false){
        this.hasEdit = true;
        this.hasDelete = true;
        this.hascancelConfirm = true;
      }
      else if(this.data.HadConfirmed === true && this.data.ConfirmedQuantity < this.data.OrderQuantity && deliveryDates > today){
        this.hasEdit = false;
        this.hasDelete = true;
        this.hascancelConfirm = true;
      }
      if(deliveryDates > today){
        this.hasConfirm = true;
      }
      if(this.data.ConfirmedQuantity < this.data.OrderQuantity && deliveryDates > today && this.data.ConfirmedQuantity != 0){
        this.hascancelConfirm = true;
        this.hasEdit = false;
        this.hasDelete = false;
        this.expireBooking = false;
        this.hasConfirm = true;
      }
      if(this.data.ConfirmedQuantity < this.data.OrderQuantity && deliveryDates <= today){
        this.expireBooking = true;
        this.hasEdit = false;
        this.hasDelete = false; 
      }
      if(this.data.ConfirmedQuantity >= this.data.OrderQuantity && this.data.IsBlockingPlan === true){
        this.hasEdit = false;
        this.hasDelete = false;
        //this.hasConfirm = false;
      }
      if(this.data.ConfirmedQuantity >= this.data.OrderQuantity && this.data.IsBlockingPlan === false){
        this.hasCancel = true;
        this.hasDelete = false;
        this.hasEdit = false;
        this.hasConfirm = true;
      }
      if(deliveryDates <= today){
        this.hasConfirm = false;
      }
      if(this.data.IsBlockingPlan == true){
        this.hasMasterPlan = true;
      }
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  edit(event) {
    this.router.navigateToRoute('edit', { id: this.data.Id });
  }   

  cancelBooking() {
        this.service.cancelBooking(this.data)
        .then(result => {
          this.cancel();
        });
    }

  confirmBooking(event) {
    this.router.navigateToRoute('confirm', { id: this.data.Id });
  }  

  masterPlan(event) {
    this.router.navigateToRoute('detail', { id: this.data.Id });
  }

  expired() {
        this.service.expiredBooking(this.data)
        .then(result => {
          this.cancel();
        });
    }
   
  delete(event) {
    this.service.delete(this.data)
        .then(result => {
          this.cancel();
        });
  }  

  onitemchange(event) {
    var indexCanceledItem = this.data.Items.findIndex(item => item.IsCanceled);
    
    if(indexCanceledItem > -1) {
      this.data.cancelConfirm=true;
      this.service.update(this.data)
        .then(result => {
          alert("Confirm Canceled");
          // this.hasEdit = true;
          // this.hasDelete = true;
          // this.hascancelConfirm = true;
          // this.hasConfirm = true;
          this.activate({id:this.data.Id});
        })
        .catch(e => {
          this.error = e;
          this.activate({id:this.data.Id});
        });
    }
  }
}