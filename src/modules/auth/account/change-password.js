import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class ChangePassword {
    @bindable error;
    @bindable newData;
    updateData;


    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.updateData = {};
        this.error = {};
        this.currentPassword = "";
    }

    async activate(params) {
        let id = params.id;
        await this.service.getById(id).then(result => {
            this.updateData = result;
        });
    }

    isPasswordValid(newPassword, repeatNewPassword) {
        if (newPassword === repeatNewPassword
            && newPassword !== ""
            && repeatNewPassword !== ""
            && newPassword != undefined
            && repeatNewPassword != undefined) {
            return true;
        }

        if (newPassword == undefined || newPassword === "") {
            this.error.newPassword = "Please input your password"
        }

        if (repeatNewPassword == undefined || repeatNewPassword === "") {
            this.error.repeatNewPassword = "Please input your password"
        }

        if (newPassword != repeatNewPassword
            && (this.error.repeatNewPassword === ""
                || this.error.repeatNewPassword === undefined)) {
            this.error.repeatNewPassword = "Your New password not same as Repeat password";
        }
        return false;
    }

    resetAll() {
        this.error = {};
        this.newData = {};
    }

    back() {
        this.router.navigateToRoute('view', { id: this.updateData._id });
    }

    updatePassword() {
        this.error = {};
        let isValid = this.isPasswordValid(this.newData.newPassword, this.newData.repeatNewPassword)
        if (isValid) {
            this.updateData.password = this.newData.newPassword;
            this.updateData.confirmPassword = this.newData.repeatNewPassword;
            this.service.update(this.updateData).then(result => {
                this.router.navigateToRoute('view', { id: this.updateData._id });
            }).catch(e => {
                console.log(e);
            })
        }
    }

}