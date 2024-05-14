import { Model, Types } from "mongoose";

export const insertDocument = async <T, Document>(model: Model<T>, document: Document) => {
	try {
		const documentInstance = await new model(document).save();
		return documentInstance;
	} catch (err) {
		throw err;
	}
};

const query = {
	insertDocument
};

export default query;
