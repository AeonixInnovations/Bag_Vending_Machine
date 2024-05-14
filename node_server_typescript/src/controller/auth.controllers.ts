import { Request, Response } from "express";
import { MESSAGE } from "../constants/message";
import adminModel from "../model/admin.model";
import { service } from "../services/index.service";
import { StatusCodes } from "http-status-codes";

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { user_name, email, phone_number, password } = req.body;

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        message: MESSAGE.custom("Email is already registered!"),
      });
    }

    // Check if email is valid or not
    if (!service.common.isValidEmailService(email)) {
      return res.status(400).json({
        message: MESSAGE.custom("Invalid Email!"),
      });
    }

    const hashedPassword = await service.auth.hashPassword(password);

    const admin = await adminModel.create({
      user_name,
      email,
      phone_number,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: MESSAGE.post.succ,
      result: admin,
    });
  } catch (error: any) {
    console.error("Error creating admin:", error);
    return res.status(400).json({
      message: MESSAGE.post.fail,
      error: error.message,
    });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { user_id, password } = req.body;

    const query = user_id.includes("@")
      ? { email: service.auth.convertCaseInsensitiveForQuery(user_id) }
      : { phone_number: user_id };

    const adminLoginInstance = await adminModel.findOne({
      $and: [query],
    });

    if (!adminLoginInstance) {
      return res.status(409).json({
        message: MESSAGE.custom("Email is already registered!"),
      });
    }

    // Comparing given Password with Actual Password
    const passwordCompare: boolean = await service.auth.comparePassword(
      password,
      adminLoginInstance.password
    );

    if (!passwordCompare) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: MESSAGE.custom("Authentication Failed!"),
      });
    }

    return res.status(StatusCodes.OK).json({
      message: MESSAGE.post.succAuth,
      result: adminLoginInstance,
    });
  } catch (error: any) {
    console.error("Error creating admin:", error);
    return res.status(400).json({
      message: MESSAGE.post.fail,
      error: error.message,
    });
  }
};
