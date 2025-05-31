import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {InEdgePut} from "../../../edge/InEdgePut.ts";
import {WithDataBoardMode} from "../../WithDataBoardMode.ts";
import type {SettingOutEdgePutBoardModeData} from "./data/SettingOutEdgePutBoardModeData.ts";
import {settingOutEdgePutBoardModeKindName} from "./kind-name/settingOutEdgePutBoardModeKindName.ts";
export class SettingOutEdgePutBoardMode extends WithDataBoardMode<
	typeof settingOutEdgePutBoardModeKindName,
	SettingOutEdgePutBoardModeData
> {
	public constructor(
		input: InEdgePut,
		mouseCursorInBoardPosition: Coordinates,
	) {
		super(
			{input, mouseCursorInBoardPosition},
			settingOutEdgePutBoardModeKindName,
		);
	}
}
