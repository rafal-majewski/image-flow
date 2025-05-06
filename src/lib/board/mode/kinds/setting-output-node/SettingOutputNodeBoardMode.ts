import type {BoardModeWithData} from "../../types/with-data/BoardModeWithData.ts";
import type {SettingOutputNodeBoardModeData} from "./data/SettingOutputNodeBoardModeData.ts";
import type {settingOutputNodeBoardModeKindName} from "./kind-name/settingOutputNodeBoardModeKindName.ts";
export type SettingOutputNodeBoardMode = BoardModeWithData<
	typeof settingOutputNodeBoardModeKindName,
	SettingOutputNodeBoardModeData
>;
