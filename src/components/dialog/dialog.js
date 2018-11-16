import { inject, noView } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from './prompt';
import { Confirm }from './confirm';
import { Error } from './error';
import { ConfirmRO } from './confirmRO';

@inject(DialogService)
@noView()
export class Dialog {
    constructor(dialogService) {
        this.dialogService = dialogService;
    }
    confirm(message, title) {
        return this.show(Confirm, { title: title, message: message })
            .then(response => {
                var result = "ok";

                if (response.wasCancelled)
                    result = "cancelled";

                return Promise.resolve(result);
            });
    }

    confirmRO(message, title){
        return this.show(ConfirmRO, { title: title, message: message})
                   .then(response => {
                       var result ='ok';
                        if (response.wasCancelled)
                        {
                            result ='cancelled';
                        }
                      
                       return Promise.resolve(result);
                   })
    }

    prompt(message, title) {
        return this.show(Prompt, { title: title, message: message })
            .then(response => {
                var result = "ok";

                if (response.wasCancelled)
                    result = "cancelled";

                return Promise.resolve(result);
            });
    }

    error(message, title) {
        return this.show(Error, { title: title, message: message })
            .then(response => {
                var result = "ok";
                return Promise.resolve(result);
            });
    }

    show(view, model) {
        return this.dialogService.open({ viewModel: view, model: model });
    }
}