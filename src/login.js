import { Aurelia, inject } from 'aurelia-framework';
import { AuthService } from "aurelia-authentication";
import '../styles/signin.css';

@inject(Aurelia,AuthService)
export class Login {
    username = "dev";
    password = "Standar123";

    // username="";
    // password="";

    constructor(aurelia, authService) {
        this.aurelia = aurelia;
        this.authService = authService;
    }

    login() {
        // return this.authService.login({ "username": this.username, "password": this.password })
        //     .then(response => {
        //         console.log("success logged " + response);
        //         this.authService.getMe(response.data)
        //             .then(account => {
        //                 // this.session.token = token;
        //                 // this.session.data = account;
        //                 if (account) {
        //                     this.authService.authentication.storage.set("me", JSON.stringify(account));
        //                 } else {
        //                     this.authService.authentication.storage.remove("me");
        //                 }
        //                 this.aurelia.setRoot('app');
        //             })
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         console.log("login failure");
        //     });
         return this.authService.login({ "username": this.username, "password": this.password })
            .then(response => {
                console.log("success logged " + response);
            })
            .catch(err => {
                console.log(err);
                console.log("login failure");
            });
    }
} 