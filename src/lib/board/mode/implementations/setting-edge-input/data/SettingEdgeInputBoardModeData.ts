import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {OutEdgePut} from "../../../../edge/OutEdgePut.ts";
export type SettingInEdgePutBoardModeData = Readonly<{
	index: number;
	mouseCursorInBoardPosition: Coordinates;
	output: OutEdgePut;
}>;
