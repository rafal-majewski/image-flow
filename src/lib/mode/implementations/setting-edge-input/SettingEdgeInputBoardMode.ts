import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {WithDataBoardMode} from "../../with-data/WithDataBoardMode.ts";
import {settingEdgeInputBoardModeName} from "./name/settingEdgeInputBoardModeName.ts";
import type {SettingEdgeInputBoardModeData} from "./data/SettingEdgeInputBoardModeData.ts";
import type {Node} from "../../../node/Node.ts";
export class SettingEdgeInputBoardMode extends WithDataBoardMode<
	typeof settingEdgeInputBoardModeName,
	SettingEdgeInputBoardModeData
> {
	public constructor(
		index: number,
		mouseCursorInBoardPosition: Coordinates,
		output: Node,
	) {
		super(
			{index, mouseCursorInBoardPosition, output},
			settingEdgeInputBoardModeName,
		);
	}
}
