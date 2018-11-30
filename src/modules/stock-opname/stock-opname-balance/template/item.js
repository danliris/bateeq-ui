import moment from 'moment';

export class Item {

  activate(context) {
    this.item = context.data;
    this.error = context.error;
    this.options = context.options;
    this.item.opnameDate = moment(this.item.opnameDate).locale('id').format("DD MMMM YYYY");
  }
  controlOptions = {
    control: {
      length: 12
    }
  };
}