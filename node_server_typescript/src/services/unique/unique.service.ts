import { Model } from "mongoose";

export const generateUniqueAutoIncrementId = async <T>(model: Model<T>, group_id: number | null): Promise<number> => {
	try {
		const autoIdGenerationFilter = group_id ? { group_id } : {};
		const generateAutoIdInstance = await model.find(autoIdGenerationFilter).lean();
		if (generateAutoIdInstance.length === 0) {
			return 1;
		} else {
			return (generateAutoIdInstance.length as unknown as number) + 1;
		}
	} catch (err) {
		throw err;
	}
};

export const unique = {
	generateUniqueAutoIncrementId
};
