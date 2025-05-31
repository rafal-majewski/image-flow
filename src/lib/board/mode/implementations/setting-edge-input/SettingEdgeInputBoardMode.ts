import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {OutEdgePut} from "../../../edge/OutEdgePut.ts";
import {WithDataBoardMode} from "../../WithDataBoardMode.ts";
import type {SettingInEdgePutBoardModeData} from "./data/SettingInEdgePutBoardModeData.ts";
import {settingInEdgePutBoardModeKindName} from "./kind-name/settingInEdgePutBoardModeKindName.ts";
export class SettingInEdgePutBoardMode extends WithDataBoardMode<
	typeof settingInEdgePutBoardModeKindName,
	SettingInEdgePutBoardModeData
> {
	public constructor(
		index: number,
		mouseCursorInBoardPosition: Coordinates,
		output: OutEdgePut,
	) {
		super(
			{index, mouseCursorInBoardPosition, output},
			settingInEdgePutBoardModeKindName,
		);
	}
}
