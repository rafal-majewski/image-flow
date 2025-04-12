import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {MapperNode} from "../../../node/kinds/mapper/MapperNode.ts";
import type {BoardMode} from "../../BoardMode.ts";
export type SettingInputNodeBoardMode = BoardMode<
	"settingInputNode",
	Readonly<{targetNode: MapperNode; sourcePosition: Coordinates}>
>;
