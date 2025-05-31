import type {AddingNodeBoardMode} from "../implementations/adding-node/AddingNodeBoardMode.ts";
import type {MovingCameraBoardMode} from "../implementations/moving-camera/MovingCameraBoardMode.ts";
import type {MovingNodeBoardMode} from "../implementations/moving-node/MovingNodeBoardMode.ts";
import type {SettingInEdgePutBoardMode} from "../implementations/setting-edge-input/SettingInEdgePutBoardMode.ts";
import type {SettingOutEdgePutBoardMode} from "../implementations/setting-edge-output/SettingOutEdgePutBoardMode.ts";
export type SupportedBoardMode =
	| AddingNodeBoardMode
	| MovingCameraBoardMode
	| MovingNodeBoardMode
	| SettingInEdgePutBoardMode
	| SettingOutEdgePutBoardMode;
