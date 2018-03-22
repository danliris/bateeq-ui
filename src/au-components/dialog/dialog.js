import { inject, noView } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from './prompt';
import { Alert } from './alert';

@inject(DialogService)
@noView()
export class Dialog {
    constructor(dialogService) {
        this.dialogService = dialogService;
    }

    alert(message, title) {
        return this.show(Alert, { title: title, message: message })
            .then(response => {
                return Promise.resolve({ ok: !response.wasCancelled });
            });
    }
    
    prompt(message, title) {
        return this.show(Prompt, { title: title, message: message })
            .then(response => {
                return Promise.resolve({ ok: !response.wasCancelled });
            });
    }

    show(view, model) {
        return this.dialogService.open({ viewModel: view, model: model });
    }
}