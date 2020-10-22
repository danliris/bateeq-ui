
export class FinishingGoodsItem {
    activate(context){
    console.log(context.data);
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;}
}
