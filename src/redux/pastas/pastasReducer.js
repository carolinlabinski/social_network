import { BUY_PASTAS } from "./pastasType";
import { EAT_PASTAS } from "./pastasType";

const initialState = {
	pastas: "not_authenticated",
	// list: undefined,
};

const pastasReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUY_PASTAS:
			return {
				...state,
				pastas: "authenticated",
				// list: action.list,
			};
		case EAT_PASTAS:
			return {
				...state,
				pastas: "not_authenticated",
			};
		default:
			return state;
	}
};

export default pastasReducer;
