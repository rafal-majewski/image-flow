import type {BoardModeWithoutData} from "../without-data/BoardModeWithoutData.ts";
export type BoardModeWithData<
	KindNameToUse extends string,
	DataToUse,
> = BoardModeWithoutData<KindNameToUse> & Readonly<{data: DataToUse}>;
