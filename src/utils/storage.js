import { inject } from 'aurelia-framework';
import { AuthService } from 'aurelia-authentication';

@inject(AuthService)
export class LocalStorage {

    constructor(authService) {
        this.authService = authService;
    }

    get me() {
        return JSON.parse(this.authService.authentication.storage.get("me"))
    }
    get store() {
        if (this.authService.authentication.storage.get("store"))
            return JSON.parse(this.authService.authentication.storage.get("store"))
        else
            return {}
    }
    get token() {
        return JSON.parse(this.authService.authentication.storage.get("aurelia_authentication")).data;
    }
}