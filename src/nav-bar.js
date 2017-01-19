


import { inject, Aurelia, BindingEngine, computedFrom } from 'aurelia-framework';
import { AuthService } from 'aurelia-authentication';
import { Router } from 'aurelia-router';
import { LocalStorage } from './utils/storage';

@inject(Aurelia, Router, BindingEngine, AuthService, LocalStorage)
export class NavBar {
    constructor(aurelia, router, bindingEngine, authService, localStorage) {
        this.aurelia = aurelia;
        this.router = router;
        this.bindingEngine = bindingEngine;
        this.authService = authService;
        this.localStorage = localStorage;
        this.storeId = this.localStorage.store._id;

        this.user = this.localStorage.me;
    }

    attached() {



        this.stores = [];
        var storage = this.authService.authentication.storage;
        if (storage.get("me")) {
            this.stores = JSON.parse(storage.get("me")).data.stores;
        }


        this.bindingEngine.propertyObserver(this, "storeId").subscribe((newValue, oldValue) => {
            for (var store of this.stores) {
                if (store._id.toString() === this.storeId.toString()) {
                    this.authService.authentication.storage.set("store", JSON.stringify(store)); 
                    document.location.reload()
                    break;
                }
            }
        });
    }






    @computedFrom('authService.authenticated')
    get isAuthenticated() {
        if (this.authService.authenticated) {
            this.authService.getMe()
                .then((result) => {
                    this.me = result.data;
                })
        }
        else {
            this.me = null;
        }

        return this.authService.authenticated;
    }


     logout() {
        // this.session.remove();
        // this.router.navigate('/')
        // this.router.reset();
        // this.aurelia.setRoot('login');
        this.authService.logout("#/login");
        this.authService.authentication.storage.remove("store");
        this.authService.authentication.storage.remove("me");



    }
}