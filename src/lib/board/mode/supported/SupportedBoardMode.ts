import type {AddingNodeBoardMode} from "../kinds/adding-node/AddingNodeBoardMode.ts";
import type {MovingCameraBoardMode} from "../kinds/moving-camera/MovingCameraBoardMode.ts";
import type {MovingNodeBoardMode} from "../kinds/moving-node/MovingNodeBoardMode.ts";
import type {SettingInputNodeBoardMode} from "../kinds/setting-input-node/SettingInputNodeBoardMode.ts";
import type {SettingOutputNodeBoardMode} from "../kinds/setting-output-node/SettingOutputNodeBoardMode.ts";
export type SupportedBoardMode =
	| AddingNodeBoardMode
	| MovingCameraBoardMode
	| MovingNodeBoardMode
	| SettingInputNodeBoardMode
	| SettingOutputNodeBoardMode;
