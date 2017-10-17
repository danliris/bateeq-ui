import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { IosFullScreen } from './../../utils/ios-fullscreen';
require('powerbi-client');


@inject(Router, Service, IosFullScreen)
export class View {
    constructor(router, service, iosFullScreen) {
        this.router = router;
        this.service = service;
        this.iosFullScreen = iosFullScreen;
    }

    activate(params) {
        var id = params.id;
        this.service.getById(id)
            .then(data => {
                this.data = data;
                var container = document.getElementById("powerbi-container");
                this.report = powerbi.embed(container, data);
            })
    }

    attached() {
        this.document = document;
    }

    fullscreen() {
        var standalone = window.navigator.standalone;
        this.iosFullScreen.fullScreen(standalone, this.report);
    }

    list() {
        this.router.navigateToRoute('list');
    }
}