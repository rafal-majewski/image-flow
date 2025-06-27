import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {Node} from "../../../../node/Node.ts";
export type SettingEdgeInputBoardModeData = {
	readonly index: number;
	readonly mouseCursorInBoardPosition: Coordinates;
	readonly output: Node;
};
