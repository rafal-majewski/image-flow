import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {OutputNode} from "../../../../node/OutputNode.ts";
export type SettingInputNodeBoardModeData = Readonly<{
	targetNode: OutputNode;
	sourcePosition: Coordinates;
}>;
