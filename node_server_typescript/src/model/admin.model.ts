import { model } from "mongoose";
import { IAdminSchema } from "../@types/interface/Admin.interface";
import adminSchema from "./schemaDefinations/admin.schema";

const adminModel = model<IAdminSchema>("admin", adminSchema);

export default adminModel;
