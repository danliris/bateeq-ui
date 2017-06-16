import {bindable} from 'aurelia-framework'

export class Item {
  activate(context) {
    this.item = context.data;
    this.error = context.error;
    this.options = context.options;
    console.log(this.error);
  }

  // @computedFrom("item.qtySO", "item.qtyBeforeSO")
  get qtyDifferent(){
      return (this.item.qtySO - this.item.qtyBeforeSO);
  }
  
  get isAdjust(){
      return (this.item.qtySO - this.item.qtyBeforeSO) === 0 ? true : false;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}