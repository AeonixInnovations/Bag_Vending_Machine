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
router.patch("/update-today-stock", stockUpdate_controller_1.updateStock);
// router.post("/postStock",postDailyStock);
// router.post("/postRefillCount", postRefillCount);
// router.get("/getRefillStockDetails",getRefillStockDetails);
/**
 * dashboard
 */
router.get("/getTotalDevices", dashboard_controller_1.getTotalDevices);
router.get("/getDispensedCounts", dashboard_controller_1.getDispensedCounts);
router.get("/getOutOfBagCount", dashboard_controller_1.getOutOfBagCount);
router.get("/getTotalMarketCount", dashboard_controller_1.getTotalMarketCount);
