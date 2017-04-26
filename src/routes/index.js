var tokoRoutes = require("./toko");
var gudangPusatRoutes = require("./gudang-pusat");
var laporanRoutes = require("./laporan");
var publicRoutes = require("./public");
var reportRoutes = require("./report");
var authRoutes = require("./auth");
var merchandiser = require("./merchandiser");
export default [].concat(publicRoutes, tokoRoutes, gudangPusatRoutes, laporanRoutes,reportRoutes, merchandiser);
// export default [].concat(publicRoutes, tokoRoutes, gudangPusatRoutes, laporanRoutes, reportRoutes);