import { bindable } from 'aurelia-framework'

export class Item {
    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.context = context;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get dataAhTotal() {
        this.data.AhTotal = this.data.Operator * this.data.WorkingHours;
        return this.data.AhTotal;
    }

    set dataAhTotal(value) {
        this.data.AhTotal = value;
    }

    get dataEhTotal() {
        this.data.EhTotal = Math.round(this.data.AhTotal * this.data.Efficiency / 100);
        return this.data.EhTotal;
    }

    set dataEhTotal(value) {
        this.data.EhTotal = value;
    }

    get dataRemainingEH() {
        this.data.RemainingEh = this.data.EhTotal - this.data.UsedEh;
        return this.data.RemainingEh;
    }

    set dataRemainingEH(value) {
        this.data.RemainingEh = value;
    }
}