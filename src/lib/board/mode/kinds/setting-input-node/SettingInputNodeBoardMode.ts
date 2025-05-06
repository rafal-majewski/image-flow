import type {BoardModeWithData} from "../../types/with-data/BoardModeWithData.ts";
import type {SettingInputNodeBoardModeData} from "./data/SettingInputNodeBoardModeData.ts";
import type {settingInputNodeBoardModeKindName} from "./kind-name/settingInputNodeBoardModeKindName.ts";
export type SettingInputNodeBoardMode = BoardModeWithData<
	typeof settingInputNodeBoardModeKindName,
	SettingInputNodeBoardModeData
>;
