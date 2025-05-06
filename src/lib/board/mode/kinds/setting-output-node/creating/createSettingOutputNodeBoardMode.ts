import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {Node} from "../../../../node/Node.svelte.ts";
import {createBoardModeWithData} from "../../../types/with-data/creating/createBoardModeWithData.ts";
import {settingOutputNodeBoardModeKindName} from "../kind-name/settingOutputNodeBoardModeKindName.ts";
import type {SettingOutputNodeBoardMode} from "../SettingOutputNodeBoardMode.ts";
export function createSettingOutputNodeBoardMode(
	sourceNode: Node,
	targetPosition: Coordinates,
): SettingOutputNodeBoardMode {
	return createBoardModeWithData(settingOutputNodeBoardModeKindName, {
		sourceNode,
		targetPosition,
	});
}
