import type {AddingNodeBoardMode} from "../implementations/adding-node/AddingNodeBoardMode.ts";
import type {MovingCameraBoardMode} from "../implementations/moving-camera/MovingCameraBoardMode.ts";
import type {MovingNodeBoardMode} from "../implementations/moving-node/MovingNodeBoardMode.ts";
import type {SettingEdgeInputBoardMode} from "../implementations/setting-edge-input/SettingEdgeInputBoardMode.ts";
import type {SettingEdgeOutputBoardMode} from "../implementations/setting-edge-output/SettingEdgeOutputBoardMode.ts";
export type SupportedBoardMode =
	| AddingNodeBoardMode
	| MovingCameraBoardMode
	| MovingNodeBoardMode
	| SettingEdgeInputBoardMode
	| SettingEdgeOutputBoardMode;
