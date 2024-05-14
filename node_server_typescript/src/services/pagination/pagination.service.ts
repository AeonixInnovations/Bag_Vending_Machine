import { FilterQuery, Model } from "mongoose";
import { ROLES } from "../../constants/roles/roles";

type Operation = "STORES" | "GROUPS" | "DEVICES" | "CUSTOMERS" | "SCANS" | "PRODUCT" | "GROUP_OWNERS";

export const getPaginatedDocuments = async <T>(
	model: Model<any>,
	pageReq: number,
	limitReq: number,
	filter: FilterQuery<T>,
	operation: Operation | null = null
) => {
	try {
		let totalPages;
		const totalDocuments = await model.countDocuments(filter);
		console.log("totalDocuments", totalDocuments);
		if (totalDocuments === 0) {
			return null;
		}
		const pagination: any = {};
		const page = pageReq || 1;
		const limit = limitReq || totalDocuments;
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		// Pagination of All Documents
		let allDocuments: any = {};

		console.log("filter", filter);

		if (operation === "STORES") {
			// const memberFilter: FilterQuery<IMember> = filter as IMember;

			allDocuments = await model
				.find({ ...filter })
				.populate("group")
				.limit(limit)
				.skip(startIndex);
		} else if (operation === "DEVICES") {
			allDocuments = await model.find(filter).populate("store").limit(limit).skip(startIndex);
		} else if (operation === "GROUPS") {
			allDocuments = await model.find(filter).populate("stores").limit(limit).skip(startIndex);
		} else if (operation === "CUSTOMERS") {
			allDocuments = await model.find(filter).limit(limit).skip(startIndex);
		} else if (operation === "SCANS") {
			allDocuments = await model.find(filter).populate("group customer store").limit(limit).skip(startIndex);
		} else if (operation === "PRODUCT") {
			allDocuments = await model.find(filter).limit(limit).skip(startIndex);
		} else if (operation == "GROUP_OWNERS") {
			if(filter.role && filter.role !==ROLES.super_admin){
				allDocuments = await model.find({...filter, role: {$ne: ROLES.super_admin}}).limit(limit).skip(startIndex);
			}
			else{
				delete filter.role
				allDocuments = await model.find(filter).limit(limit).skip(startIndex);
			}
		}
		if (!allDocuments) {
			// return res.status(StatusCodes.BAD_REQUEST).json({
			// 	message: MESSAGE.get.fail
			// });
			return null;
		}

		// Documents shown for Particular Page
		const totalDocumentsPerPage = allDocuments.length;

		// For Total Pages Calculations of All Documents
		const pages = totalDocuments / limit;
		const remainingAnnouncements = totalDocuments % limit;

		if (remainingAnnouncements === 0) totalPages = Math.trunc(pages);
		else totalPages = Math.trunc(pages + 1);

		// Filtered Documents
		// Pagination Next and Previous Conditions of Documents
		if (endIndex < totalDocuments) {
			pagination.nextPage = {
				page: page + 1,
				limit: limit
			};
		}

		if (startIndex > 0 && totalDocuments !== 0) {
			pagination.previousPage = {
				page: page - 1,
				limit: limit
			};
		}

		if (totalDocuments === 0) {
			return null;
		}

		if (page > totalPages) {
			return true;
		}

		console.log("Total Pages: ", totalPages);
		if (totalPages === null || isNaN(totalPages)) totalPages = 0;

		return {
			totalDocuments,
			totalPages,
			totalDocumentsPerPage,
			pagination,
			allDocuments
		};
	} catch (err) {
		throw err;
	}
};
