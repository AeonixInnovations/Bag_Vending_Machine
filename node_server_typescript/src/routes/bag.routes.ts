import express from "express";
import {
  getAllDeviceList,
  getDeviceMaxStockById,
  registerNewDevice,
  updateAvailableStock,
  updateMaxStock,
} from "../controller/deviceController";
import { createAdmin, loginAdmin } from "../controller/auth.controllers";
import { fetchDeviceData } from "../controller/deviceController";
import { getRefillStockDetails, postDailyStock, postRefillCount } from "../controller/stock.controller";

const router = express.Router();

// router.get("/")
router.post("/registerNewDevice", registerNewDevice);
router.put("/updateAvailableStock", updateAvailableStock);
router.put("/updateMaxStock", updateMaxStock);
router.get("/getMaxStock/:device_id", getDeviceMaxStockById);
router.get("/getAllDeviceList", getAllDeviceList);
router.get("/getAllDeviceList",getAllDeviceList);
router.post("/fetchSingleDeviceData", fetchDeviceData);
router.post("/signupAdmin", createAdmin);
router.post("/loginAdmin", loginAdmin);

router.post("/postStock",postDailyStock);
router.post("/postRefillCount", postRefillCount);
router.get("/getRefillStockDetails",getRefillStockDetails);
export { router as DeviceRouter };