"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRouter = void 0;
const express_1 = __importDefault(require("express"));
const deviceController_1 = require("../controller/deviceController");
const auth_controllers_1 = require("../controller/auth.controllers");
const deviceController_2 = require("../controller/deviceController");
const dashboard_controller_1 = require("../controller/dashboard.controller");
const stockUpdate_controller_1 = require("../controller/stockController/stockUpdate.controller");
const graph_comtrollers_1 = require("../controller/graph/graph.comtrollers");
const TotalSells_1 = require("../controller/TotalSells/TotalSells");
const deviceSales_1 = require("../controller/deviceSales/deviceSales");
const router = express_1.default.Router();
exports.DeviceRouter = router;
// router.get("/")
router.post("/registerNewDevice", deviceController_1.registerNewDevice);
router.put("/updateAvailableStock", deviceController_1.updateAvailableStock);
router.put("/updateMaxStock", deviceController_1.updateMaxStock);
router.get("/getMaxStock/:device_id", deviceController_1.getDeviceMaxStockById);
router.get("/getAllDeviceList", deviceController_1.getAllDeviceList);
router.get("/getAllDeviceList", deviceController_1.getAllDeviceList);
router.post("/fetchSingleDeviceData", deviceController_2.fetchDeviceData);
router.post("/signupAdmin", auth_controllers_1.createAdmin);
router.post("/loginAdmin", auth_controllers_1.loginAdmin);
router.post("/updateStocks/:device_id", stockUpdate_controller_1.createStockForDevice);
router.put("/updateStocks_bymachine/:device_id", stockUpdate_controller_1.updateStockForDevice);
// router.post("/postStock",postDailyStock);
// router.post("/postRefillCount", postRefillCount);
// router.get("/getRefillStockDetails",getRefillStockDetails);
/**
 * dashboard
 */
router.get("/getTotalDevices", dashboard_controller_1.getTotalDevices);
router.get("/getDispensedCounts", dashboard_controller_1.getDispensedCounts);
router.get("/getOutOfOrderCount", dashboard_controller_1.getOutOfOrderCount);
router.get("/getALlStocks", graph_comtrollers_1.getMonthlySales);
router.get("/getAllDevices", graph_comtrollers_1.getDevicesCreatedMonthly);
router.get("/getSales", TotalSells_1.getSalesData);
router.get("/getDevices", deviceSales_1.getDeviceData);
router.get("/getTotalMarket", dashboard_controller_1.getTotalMarketCount);
