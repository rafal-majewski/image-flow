import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {settingEdgeInputBoardModeName} from "./name/settingEdgeInputBoardModeName.ts";
import type {SettingEdgeInputBoardModeData} from "./data/SettingEdgeInputBoardModeData.ts";
import {WithDataBoardMode} from "../../with-data/WithDataBoardMode.ts";
import type {OperatingNode} from "../../../node/operating/OperatingNode.svelte.ts";
export class SettingEdgeInputBoardMode extends WithDataBoardMode<
	SettingEdgeInputBoardModeData,
	typeof settingEdgeInputBoardModeName
> {
	public constructor(
		index: number,
		mouseCursorInBoardPosition: Coordinates,
		output: OperatingNode<number>,
	) {
		super(
			{index, mouseCursorInBoardPosition, output},
			settingEdgeInputBoardModeName,
		);
	}
}
