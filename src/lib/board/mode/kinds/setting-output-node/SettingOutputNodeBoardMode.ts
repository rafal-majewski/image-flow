import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {SupportedNode} from "../../../node/SupportedNode.ts";
import type {BoardMode} from "../../BoardMode.ts";
export type SettingOutputNodeBoardMode = BoardMode<
	"settingOutputNode",
	Readonly<{sourceNode: SupportedNode; targetPosition: Coordinates}>
>;
