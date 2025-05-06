import type {BoardModeWithData} from "../BoardModeWithData.ts";
export function createBoardModeWithData<
	KindNameToUse extends string,
	DataToUse,
>(
	kindName: KindNameToUse,
	data: DataToUse,
): BoardModeWithData<KindNameToUse, DataToUse> {
	return {kindName, data};
}
