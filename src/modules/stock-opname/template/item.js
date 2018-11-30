import {bindable,computedFrom} from 'aurelia-framework'
import { format } from 'path';
import moment from 'moment';

export class Item {

  activate(context) {
    this.item = context.data;
    this.error = context.error;
    this.options = context.options;
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
    var _myCreatedDate = moment(this.item._createdDate).locale('id').format('DD MMM YYYY');
    var myString = 'SO tanggal';
    this.item.remark = _myCreatedDate
    return (this.item.isAdjusted ? myString + ' ' + _myCreatedDate  : '')
  }
 

  controlOptions = {
    control: {
      length: 12
    }
  };
}