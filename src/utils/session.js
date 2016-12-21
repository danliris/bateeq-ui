import {Cookie} from 'aurelia-cookie';

export class Session {
    cookieOption = {
        expiry: 8, // Expiry in hours, -1 for never expires or minimum 1 for one hour, 2 for two hours and so
        path: '', // Specify cookie path
        domain: '', // Domain restricted cookie
        secure: false // Either true or false
    };

    get token() {
        if (!Cookie.get('__jwt'))
            Cookie.set('__jwt', JSON.stringify({}), this.cookieOption);
        var json = Cookie.get('__jwt');
        return JSON.parse(json);
    }
    set token(value) {
        Cookie.set('__jwt', JSON.stringify(value), this.cookieOption);
    }

    get data() {
        if (!Cookie.get('__user'))
            Cookie.set('__user', JSON.stringify({}), this.cookieOption);
        var json = Cookie.get('__user');
        return JSON.parse(json);
    }
    set data(value) {
        Cookie.set('__user', JSON.stringify(value), this.cookieOption);
    }
    
    get local() {
        if (!Cookie.get('__local'))
            Cookie.set('__local', JSON.stringify({}), this.cookieOption);
        var json = Cookie.get('__local');
        return JSON.parse(json);
    }
    set local(value) {
        Cookie.set('__local', JSON.stringify(value), this.cookieOption);
    }

    get isAuthenticated() {
        return (this.data.username || '').toString().length > 0;
    }

    get username() {
        return (this.data.username || '').toString();
    }
    set username(value) {
        var data = this.data;
        data.username = value;
        this.data = data;
    }
    get profile() {
        return this.data.profile || {};
    }
    set profile(value) {
        var data = this.data;
        data.profile = value;
        this.data = data;
    }
    get roles() {
        return this.data.roles || [];
    }
    set roles(value) {
        var data = this.data;
        data.roles = value;
        this.data = data;
    }
    get stores() {
        return this.data.stores || [];
    }
    set stores(value) {
        var data = this.data;
        data.stores = value;
        this.data = data;
    }

    get store() {
        var storeData = {};
        if(this.local.store) 
        {
            if(this.stores.length > 0)
            {
                storeData = this.stores[0];
            }
        }
        return this.local.store || storeData;
    }
    set store(value) {
        var local = this.local;
        local.store = value;
        this.local = local;
    }
    
    get shift() { 
        var local = this.local;
        var today = new Date(); 
        local.shift = 0;
        if(this.store.shifts) {
            for (var shift of this.store.shifts) {
                var dateFrom = new Date(this.getUTCStringDate(today) + "T" + this.getUTCStringTime(new Date(shift.dateFrom)));
                var dateTo = new Date(this.getUTCStringDate(today) + "T" + this.getUTCStringTime(new Date(shift.dateTo)));
                if (dateFrom < today && today < dateTo) {
                    local.shift = parseInt(shift.shift);
                    break;
                }
            } 
        }
        this.local = local;
        return local.shift;
    }
    
    remove() {
        Cookie.delete('__jwt'); // Delete a cookie by name
        Cookie.delete('__user'); // Delete a cookie by name
        Cookie.delete('__local'); // Delete a cookie by name
    }
    
    getUTCStringDate(date) {
        var dd = date.getUTCDate();
        var mm = date.getUTCMonth() + 1; //January is 0! 
        var yyyy = date.getUTCFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        date = yyyy + '-' + mm + '-' + dd;
        return date;
    }
    
    getUTCStringTime(date) {
        var hh = date.getUTCHours();
        var mm = date.getUTCMinutes();
        var ss = date.getUTCSeconds();
        if (hh < 10) {
            hh = '0' + hh
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        if (ss < 10) {
            ss = '0' + ss
        }
        date = hh + ':' + mm + ':' + ss;
        return date;
    }
} 