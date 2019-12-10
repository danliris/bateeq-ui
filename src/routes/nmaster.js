module.exports = [
{
    route: 'garment-buyers',
    name: 'garment-buyers',
    moduleId: './modules/master/garment-buyer/index',
    nav: true,
    title: 'Buyer Garment',
    auth: true,
    settings: {
        group: "nmaster",
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
      group: "nmaster",
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
      group: "nmaster",
      permission: {"C.01": 1, "MRD.01": 1 },
      iconClass: 'fa fa-adjust'
  }

},
{
  route: 'products/budgeting',
  name: 'products/budgeting',
  moduleId: './modules/master/product-budgeting/index',
  nav: true,
  title: 'Barang',
  auth: true,
  settings: {
      group: "nmaster",
      permission: {"C.01": 1, "MRD.01": 1 },
      iconClass: 'fa fa-dashboard'
  }
},
{
  route: 'products',
  name: 'products',
  moduleId: './modules/master/product/index',
  nav: true,
  title: 'Barang',
  auth: true,
  settings: {
      group: "nmaster",
      permission: { "PBL.01": 1 },
      iconClass: 'fa fa-dashboard'
  }
},
{
  route: 'storage',
  name: 'storage',
  moduleId: './modules/master/storage/index',
  nav: true,
  title: 'Storage',
  auth: true,
  settings: {
      group: "nmaster",
      permission: {"C.01": 1, "MRD.01": 1 },
      //permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
  }
},
{
  route: 'uoms',
  name: 'uoms',
  moduleId: './modules/master/nuom/index',
  nav: true,
  title: 'Satuan',
  auth: true,
  settings: {
      group: "nmaster",
      permission: {"C.01": 1, "MRD.01": 1 },
      //permission: { "C9": 1 },
      iconClass: 'fa fa-dashboard'
  }
}
];
