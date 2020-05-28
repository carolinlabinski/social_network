import { LOG_IN } from "./logType";
import Cookies from "js-cookie";
//import { LOG_OUT } from "./logType";
const cookie = Cookies.get("token");
const initialState = {
	authenticated: cookie,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				authenticated: true,
			};
		// case LOG_OUT:
		// 	return {
		// 		...state,
		// 		authenticated: false,
		// 	};
		default:
			return state;
	}
};

export default userReducer;
