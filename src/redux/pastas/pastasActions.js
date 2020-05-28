import { BUY_PASTAS } from "./pastasType";
import { EAT_PASTAS } from "./pastasType";

export const buyPastas = () => {
	return {
		type: BUY_PASTAS,
	};
};

export const eatPastas = () => {
	return {
		type: EAT_PASTAS,
	};
};
