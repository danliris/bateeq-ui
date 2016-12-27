import { inject, bindable, containerless, computedFrom } from 'aurelia-framework';
import { Session } from './utils/session';

@containerless()
@inject(Session)
export class SideNavBar {
    @bindable router = null;
    @bindable navigations = null;
    
    constructor(session) {
        // this.router = router;
        this.session = session;
        this.minimized = false;
        this.activeMenu = [];
        this.activeSubMenu = {};
        this.group = new Map();
        // var a = new Array(this.router.navigation);
        // this.router.navigation.forEach(route => {
        //     console.log(1);
        // });
        // console.log(this.router.navigation instanceof Array);

    }

    attached() {
        for (var route of this.router.navigation) {
            if (route.settings && ((route.settings.group || "").trim().length > 0)) {
                var key = (route.settings.group || "").trim();
                if (!this.group.has(key))
                    this.group.set(key, []);

                var groupedRoutes = this.group.get(key);
                groupedRoutes.push(route);
                this.group.set(key, groupedRoutes);
            }
        };
    }

    get isAuthenticated() {
        return this.session.isAuthenticated;
    }

    @computedFrom('activeMenu')
    get expand() {
        return (this.activeMenu || []).length > 0;
    }

    toggleSideMenu() {
        this.minimized = !this.minimized;
    }

    selectMenu(menu, title) {
        this.activeMenu = menu;
        this.activeTitle = title;
        this.activeSubMenu = [];
    }

    selectSubMenu(subMenu) {
        this.minimized = false;
        this.activeMenu = [];
        this.activeSubMenu = {};

        return true;
    }
}