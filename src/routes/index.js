var tokoRoutes = require("./toko");
var gudangPusatRoutes = require("./gudang-pusat");
var laporanRoutes = require("./laporan");
var publicRoutes = require("./public");
var reportRoutes = require("./report");
var authRoutes = require("./auth");
var merchandiserRoutes = require("./merchandiser");
var finishingRoutes = require("./finishing");
var generalInventoryRoutes = require("./general-inventory");
var designerRoutes = require("./designer")
export default [].concat(publicRoutes, tokoRoutes, gudangPusatRoutes, laporanRoutes, reportRoutes, designerRoutes, merchandiserRoutes, finishingRoutes, generalInventoryRoutes, authRoutes);