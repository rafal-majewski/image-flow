import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {Node} from "../../../../node/Node.ts";
export type SettingEdgeOutputBoardModeData = {
	readonly input: Node;
	readonly mouseCursorInBoardPosition: Coordinates;
};
