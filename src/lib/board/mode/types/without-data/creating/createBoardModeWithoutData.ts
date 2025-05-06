import type {BoardModeWithoutData} from "../BoardModeWithoutData.ts";
export function createBoardModeWithoutData<KindNameToUse extends string>(
	kindName: KindNameToUse,
): BoardModeWithoutData<KindNameToUse> {
	return {kindName};
}
