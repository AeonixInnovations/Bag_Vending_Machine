import express from "express";
import { getAllDeviceList, getDeviceMaxStockById, registerNewDevice, updateAvailableStock, updateMaxStock } from "../controller/CounterController";

const router = express.Router();

// router.get("/")
router.post("/registerNewDevice", registerNewDevice);
router.put("/updateAvailableStock", updateAvailableStock);
router.put("/updateMaxStock", updateMaxStock);
router.get("/getMaxStock/:device_id", getDeviceMaxStockById);
router.get("/getAllDeviceList",getAllDeviceList)

export { router as DeviceRouter } 