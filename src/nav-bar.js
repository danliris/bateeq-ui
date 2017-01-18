import {inject, Aurelia, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Session} from './utils/session';

@inject(Aurelia, Router, BindingEngine, Session)
export class NavBar {
    constructor(aurelia, router, bindingEngine, session) {
        this.aurelia = aurelia;
        this.router = router;
        this.bindingEngine = bindingEngine;
        this.session = session;

        this.storeId = this.session.store._id;
    }
    
    attached() {
        this.stores = this.session.stores;
        this.bindingEngine.propertyObserver(this, "storeId").subscribe((newValue, oldValue) => {
            for (var store of this.stores) {
                if (store._id.toString() === this.storeId.toString()) {
                    this.session.store = store;
                    document.location.reload()
                    break;
                }
            }
        });
    }

    logout() {
        this.session.remove();
        this.router.navigate('/')
        this.router.reset();
        this.aurelia.setRoot('login');
    }
}