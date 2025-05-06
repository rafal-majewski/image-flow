import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {OutputNode} from "../../../../node/OutputNode.ts";
import {createBoardModeWithData} from "../../../types/with-data/creating/createBoardModeWithData.ts";
import {settingInputNodeBoardModeKindName} from "../kind-name/settingInputNodeBoardModeKindName.ts";
import type {SettingInputNodeBoardMode} from "../SettingInputNodeBoardMode.ts";
export function createSettingInputNodeBoardMode(
	targetNode: OutputNode,
	sourcePosition: Coordinates,
): SettingInputNodeBoardMode {
	return createBoardModeWithData(settingInputNodeBoardModeKindName, {
		targetNode,
		sourcePosition,
	});
}
