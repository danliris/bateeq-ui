module.exports = [
    {
        route: 'auth/accounts',
        name: 'accounts',
        moduleId: './modules/auth/account/index',
        nav: true,
        title: 'Account',
        auth: true,
        settings: {
            group: "Auth",
        permission: {"C.01":1},
            iconClass: 'fa fa-user-o'
        }
    },
    {
        route: 'auth/roles',
        name: 'roles',
        moduleId: './modules/auth/role/index',
        nav: true,
        title: 'Role',
        auth: true,
        settings: {
            group: "Auth",
            permission: {"C.01":1},
            iconClass: 'fa fa-user-o'
        }
    }]