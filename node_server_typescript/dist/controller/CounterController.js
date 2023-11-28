"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMaxStock = exports.updateAvailableStock = exports.getDeviceMaxStockById = exports.getAllDeviceList = exports.registerNewDevice = void 0;
const CounterSchema_1 = __importDefault(require("../model/CounterSchema"));
const registerNewDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { device_id, stock } = req.body;
    if (!device_id || !stock) {
        res.status(422).json({
            message: "fields are empty"
        });
    }
    else {
        try {
            const isExist = yield CounterSchema_1.default.findOne({ device_id: device_id });
            if (isExist) {
                return res.status(409).json({
                    message: "Device Already exist",
                });
            }
            const payload = {
                available_stocks: stock,
                date: new Date().toDateString(),
                device_id: device_id,
                last_update: new Date(),
                max_stocks: stock,
            };
            const response = yield new CounterSchema_1.default(payload).save();
            console.log(response);
            if (response) {
                return res.status(200).json({
                    message: "device register successfully",
                    result: response
                });
            }
        }
        catch (error) {
            return res.status(400).json({
                message: "error in server",
                error
            });
        }
    }
});
exports.registerNewDevice = registerNewDevice;
const getAllDeviceList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield CounterSchema_1.default.find({});
        if (response) {
            return res.status(200).json({
                message: "device list get successfully",
                data: response
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        });
    }
});
exports.getAllDeviceList = getAllDeviceList;
const getDeviceMaxStockById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { device_id } = req.params;
        const response = yield CounterSchema_1.default.findOne({ device_id: device_id }, { _id: 0, max_stocks: 1 });
        if (response) {
            return res.status(200).json({
                message: "device max stock get successfully",
                data: response
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        });
    }
});
exports.getDeviceMaxStockById = getDeviceMaxStockById;
const updateAvailableStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { device_id, available_stocks } = req.body;
        const response = yield CounterSchema_1.default.updateOne({ device_id: device_id }, {
            $set: {
                available_stocks: available_stocks
            }
        });
        if (response) {
            return res.status(200).json({
                message: "data updated successfully",
                data: response
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        });
    }
});
exports.updateAvailableStock = updateAvailableStock;
const updateMaxStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { device_id, max_stocks } = req.body;
        const response = yield CounterSchema_1.default.updateOne({ device_id: device_id }, {
            $set: {
                max_stocks: max_stocks
            }
        });
        if (response) {
            return res.status(200).json({
                message: "data updated successfully",
                data: response
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        });
    }
});
exports.updateMaxStock = updateMaxStock;
