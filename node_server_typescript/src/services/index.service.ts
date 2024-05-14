import { auth } from "./auth/auth.service";
import { common } from "./common/common.index.service";
import { date } from "./date/date.service";
import query from "./query/db.service";
import { unique } from "./unique/unique.service";

export const service: any = {
	query,
	unique,
	common,
	auth,
	date
};
