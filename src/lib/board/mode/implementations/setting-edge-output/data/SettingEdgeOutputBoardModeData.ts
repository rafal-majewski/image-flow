import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {InEdgePut} from "../../../../edge/InEdgePut.ts";
export type SettingOutEdgePutBoardModeData = Readonly<{
	input: InEdgePut;
	mouseCursorInBoardPosition: Coordinates;
}>;
