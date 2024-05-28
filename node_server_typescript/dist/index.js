"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const bag_routes_1 = require("./routes/bag.routes");
const date_service_1 = require("./services/date/date.service");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8181;
const options = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use((0, cors_1.default)(options));
app.use((0, body_parser_1.json)());
app.use([bag_routes_1.DeviceRouter]);
mongoose_1.default
    .connect(process.env.MONGO_URL ||
    "mongodb+srv://tuhin123:tuhin123@cluster0.pwhjgdx.mongodb.net")
    .then(() => console.log("  Database connected 📟 "))
    .catch((err) => console.log(err));
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
console.log((0, date_service_1.getYesterdayDate)());
