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
import { getDispensedCounts, getOutOfOrderCount, getTotalDevices } from "../controller/dashboard.controller";
import { createStockForDevice, updateStockForDevice } from "../controller/stockController/stockUpdate.controller";
import { getDeviceCountByAddress, getDevicesCreatedMonthly, getMonthlyDailySales, getMonthlySales, getMonthlyWeeklySales, getWeeklySales } from "../controller/graph/graph.comtrollers";
import { getSalesData } from "../controller/TotalSells/TotalSells";
import { getDeviceData } from "../controller/deviceSales/deviceSales";

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
router.post("/updateStocks/:device_id", createStockForDevice);
router.patch("/updateStocks_bymachine/:device_id", updateStockForDevice);

// router.post("/postStock",postDailyStock);
// router.post("/postRefillCount", postRefillCount);
// router.get("/getRefillStockDetails",getRefillStockDetails);

/**
 * dashboard
 */

router.get("/getTotalDevices",getTotalDevices);
router.get("/getDispensedCounts", getDispensedCounts);
router.get("/getOutOfOrderCount",getOutOfOrderCount);

router.get("/getALlStocks",getMonthlySales);
router.get("/getAllDevices",getDevicesCreatedMonthly);
router.get("/getSales",getSalesData);
router.get("/getSalesbyWeek",getWeeklySales);
router.get("/getSalesbyMonthlyWeek",getMonthlyWeeklySales);
router.get("/getMonthlyDailySales",getMonthlyDailySales);
router.get("/getDevices",getDeviceData);
router.get("/getDevicesAdress",getDeviceCountByAddress);

export { router as DeviceRouter };