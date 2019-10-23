module.exports = [
  {
    route: "buyer",
    name: "buyer",
    moduleId: "./modules/master/buyer/index",
    nav: true,
    title: "Buyer",
    auth: true,
    settings: {
      group: "master",
      permission: { "MRD.01": 1 },
      iconClass: "fa fa-adjust"
    }
  },
  {
    route: 'garment-buyers',
    name: 'garment-buyers',
    moduleId: './modules/master/garment-buyer/index',
    nav: true,
    title: 'Buyer Garment',
    auth: true,
    settings: {
        group: "master",
        permission: {  "C.01": 1, "MRD.01": 1 },
        iconClass: 'fa fa-adjust'
    }
},
{
  route: 'divisions',
  name: 'divisions',
  moduleId: './modules/master/division/index',
  nav: true,
  title: 'Divisi',
  auth: true,
  settings: {
      group: "master",
      permission: { "C.01": 1, "MRD.01": 1 },
      iconClass: 'fa fa-adjust'
  }
},
{
  route: 'units',
  name: 'units',
  moduleId: './modules/master/unit/index',
  nav: true,
  title: 'Unit',
  auth: true,
  settings: {
      group: "master",
      permission: {"C.01": 1, "MRD.01": 1 },
      iconClass: 'fa fa-adjust'
  }

},
  {
    route: "category",
    name: "category",
    moduleId: "./modules/master/category/index",
    nav: true,
    title: "Category",
    auth: true,
    settings: {
      group: "master",
      permission: { "MRD.01": 1 },
      iconClass: "fa fa-adjust"
    }
  },
  {
    route: "material",
    name: "material",
    moduleId: "./modules/master/material/index",
    nav: true,
    title: "Material",
    auth: true,
    settings: {
      group: "master",
      permission: { "MRD.01": 1 },
      iconClass: "fa fa-adjust"
    }
  },
  {
    route: "UOM",
    name: "UOM",
    moduleId: "./modules/master/UOM/index",
    nav: true,
    title: "UOM",
    auth: true,
    settings: {
      group: "master",
      permission: { "MRD.01": 1 },
      iconClass: "fa fa-adjust"
    }
  },
  {
    route: "rate",
    name: "rate",
    moduleId: "./modules/master/rate/index",
    nav: true,
    title: "Ongkos",
    auth: true,
    settings: {
      group: "master",
      permission: { "MRD.01": 1 },
      iconClass: "fa fa-adjust"
    }
  },
  {
    route: "size",
    name: "size",
    moduleId: "./modules/master/size/index",
    nav: true,
    title: "Size",
    auth: true,
    settings: {
      group: "master",
      permission: { "MRD.01": 1 },
      iconClass: "fa fa-adjust"
    }
  },
  {
    route: "size-range",
    name: "size-range",
    moduleId: "./modules/master/size-range/index",
    nav: true,
    title: "Size Range",
    auth: true,
    settings: {
      group: "master",
      permission: { "MRD.01": 1 },
      iconClass: "fa fa-adjust"
    }
  },
  {
    route: "efficiency",
    name: "efficiency",
    moduleId: "./modules/master/efficiency/index",
    nav: true,
    title: "Efficiency",
    auth: true,
    settings: {
      group: "master",
      permission: { "MRD.01": 1 },
      iconClass: "fa fa-adjust"
    }
  },
  {
    route: "line",
    name: "line",
    moduleId: "./modules/master/line/index",
    nav: true,
    title: "Line",
    auth: true,
    settings: {
      group: "master",
      permission: { "MRD.01": 1 },
      iconClass: "fa fa-adjust"
    }
  },
  {
    route: "product-purchasing",
    name: "product-purchasing",
    moduleId: "./modules/master/product-purchasing/index",
    nav: true,
    title: "Product | Purchasing",
    auth: true,
    settings: {
      group: "master",
      permission: { "PBL.01": 1 },
      iconClass: ""
    }
  },
  {
    route: "supplier-purchasing",
    name: "supplier-purchasing",
    moduleId: "./modules/master/supplier-purchasing/index",
    nav: true,
    title: "Supplier | Purchasing",
    auth: true,
    settings: {
      group: "master",
      permission: { "PBL.01": 1 },
      iconClass: ""
    }
  },
  {
    route: 'garment-product',
    name: 'garment-product',
    moduleId: './modules/master/garment-product/index',
    nav: true,
    title: 'Product | Garment',
    auth: true,
    settings: {
        group: "master",
        permission: { "PBL.01": 1 },
        iconClass: ''
    }
},
  {
    route: "discount",
    name: "discount",
    moduleId: "./modules/master/discount/index",
    nav: true,
    title: "Diskon | Merchandiser",
    auth: true,
    settings: {
      group: "master",
      permission: { "MRD.01": 1 },
      iconClass: ""
    }
  },
  {
    route: "sections",
    name: "sections",
    moduleId: "./modules/master/section/index",
    nav: true,
    title: "Seksi",
    auth: true,
    settings: {
      group: "master",
      permission: { "*": 1 },
      iconClass: ""
    }
  }
];
