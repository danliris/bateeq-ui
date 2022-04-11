
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
        './form/basic/typeahead',

        './customs/auto-suggests/storage-auto-suggest',
        './customs/auto-suggests/finishedgoods-auto-suggest',
        './customs/collections/role/role-permission-item-collection',
        './customs/collections/account/role-item-collection',
        './customs/collections/account/store-item-collection',
        
        './customs/auto-suggests/unit-payment-order-auto-suggest',
        './customs/auto-suggests/supplier-auto-suggest',
        './customs/collections/unit-payment-quantity-correction-note/unit-payment-quantity-correction-note-collection',

        './customs/typeahead/product-typeahead',
    );
}
