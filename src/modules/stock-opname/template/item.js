import {bindable,computedFrom} from 'aurelia-framework'
import { format } from 'path';
import moment from 'moment';

export class Item {

  activate(context) {
    this.item = context.data;
    this.error = context.error;
    this.options = context.options;
    this.item._createdDate = moment(this.item._createdDate).format('DD-MMM-YYYY');
  }
  
  get qtyDifferent(){
      return (this.item.qtyBeforeSO - this.item.qtySO);
  }
  
  get isAdjust(){
      return (this.item.qtyBeforeSO - this.item.qtySO) === 0 ? true : false;
  }

  get Adjustment(){
      return (this.item.qtyBeforeSO - this.item.qtySO) === 0 ? "" : this.item.isAdjusted ? "Ya" : "Tidak";
  }

  @computedFrom("item.isAdjusted")
  get createdDate(){
    return (this.item.isAdjusted ? this.item._createdDate : '')
  }
 

  controlOptions = {
    control: {
      length: 12
    }
  };
}