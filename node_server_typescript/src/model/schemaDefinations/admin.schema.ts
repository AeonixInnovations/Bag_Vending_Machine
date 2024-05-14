import { Schema } from "mongoose";
import { IAdminSchema } from "../../@types/interface/Admin.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";

const adminSchema: Schema<IAdminSchema> = new Schema<IAdminSchema>(
  {
    user_name: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    email: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    phone_number: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
    password: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
  },
  GENERAL_SCHEMA_OPTIONS
);

export default adminSchema;
