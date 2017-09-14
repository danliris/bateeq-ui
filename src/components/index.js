
export function configure(config) {
    config.globalResources(
        './dialog/dialog',
        './form/pagination',

        './form/basic/checkbox',
        './form/basic/datepicker',
        './form/basic/dropdown',
        './form/basic/multiline',
        './form/basic/numeric',
        './form/basic/radiobutton',
        './form/basic/password',
        './form/basic/textbox',
        './form/basic/auto-suggest',

        './customs/auto-suggests/storage-auto-suggest',
        './customs/auto-suggests/finishedgoods-auto-suggest',
        './customs/collections/role/role-permission-item-collection',
        './customs/collections/account/role-item-collection',
        './customs/collections/account/store-item-collection',
    );
}
