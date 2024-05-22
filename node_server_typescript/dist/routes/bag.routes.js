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
const stock_controller_1 = require("../controller/stock.controller");
const dashboard_controller_1 = require("../controller/dashboard.controller");
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
router.post("/postStock", stock_controller_1.postDailyStock);
router.post("/postRefillCount", stock_controller_1.postRefillCount);
router.get("/getRefillStockDetails", stock_controller_1.getRefillStockDetails);
/**
 * dashboard
 */
router.get("/getTotalDevices", dashboard_controller_1.getTotalDevices);
router.get("/getDispensedCounts", dashboard_controller_1.getDispensedCounts);
