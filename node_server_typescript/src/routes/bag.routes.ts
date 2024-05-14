import express from "express";
import {
  getAllDeviceList,
  getDeviceMaxStockById,
  registerNewDevice,
  updateAvailableStock,
  updateMaxStock,
} from "../controller/CounterController";
import { createAdmin, loginAdmin } from "../controller/auth.controllers";

const router = express.Router();

// router.get("/")
router.post("/registerNewDevice", registerNewDevice);
router.put("/updateAvailableStock", updateAvailableStock);
router.put("/updateMaxStock", updateMaxStock);
router.get("/getMaxStock/:device_id", getDeviceMaxStockById);
router.get("/getAllDeviceList", getAllDeviceList);
router.post("/signupAdmin", createAdmin);
router.post("/loginAdmin", loginAdmin);

export { router as DeviceRouter };
