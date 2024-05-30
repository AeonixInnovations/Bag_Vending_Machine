import { Request, Response } from "express";
import MarketModel from "../model/market.schema";
import { count } from "console";

export const postMarket = async (
  marketName: string,
  address: string,
  lat?: string,
  long?: string
) => {
  if (!marketName || !address) {
    // return res.status(422).json({
    //     message: "fields are empty"
    // })
    return new Error("Fields are empty");
  }
  try {
    const payload = {
      marketName: marketName,
      address: address,
      lat: lat || "",
      long: long || "",
    };
    const marketResponse = await MarketModel.create(payload);
    if (!marketResponse) {
      // return res.status(400).json({
      //     message: "Something went wrong"
      // });
      return new Error("something went wrong");
    }
    return marketResponse;
  } catch (error) {
    // res.status(500).json({
    //     message: "Internal server error",
    //     error: error
    // })
    return error;
  }
};

export const getTotalMarket = async (req: Request, res: Response) => {
  try {
    const totalMarketDetails = await MarketModel.find();
    if (!totalMarketDetails) {
      return res.status(404).json({
        message: "No data found",
      });
    }
    res.status(200).json({
      message: "Data found successfully",
      result: totalMarketDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export const getArrayOfMarket = async (req: Request, res: Response) => {
  const { searchTerm } = req.body;
  try {
    const regex = new RegExp(`^${searchTerm}`, "i"); // 'i' for case-insensitive search
    const results = await MarketModel.aggregate([
      {
        $match: {
          marketName: { $regex: regex },
        },
      },
      {
        $project: {
          _id: 0,
          marketName: 1,
        },
      },
    ]);
    const marketNames = results.map((result) => result.marketName);
    res.status(200).json({
      message: "Data found successfully",
      result: marketNames,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
