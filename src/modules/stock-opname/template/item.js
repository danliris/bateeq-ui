import {bindable} from 'aurelia-framework'

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

  controlOptions = {
    control: {
      length: 12
    }
  };
}