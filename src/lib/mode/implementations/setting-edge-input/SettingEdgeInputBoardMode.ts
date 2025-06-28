import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {settingEdgeInputBoardModeName} from "./name/settingEdgeInputBoardModeName.ts";
import type {Node} from "../../../node/Node.svelte.ts";
import type {NodeState} from "../../../node/state/NodeState.ts";
import type {SettingEdgeInputBoardModeData} from "./data/SettingEdgeInputBoardModeData.ts";
import {WithDataBoardMode} from "../../with-data/WithDataBoardMode.ts";
export class SettingEdgeInputBoardMode extends WithDataBoardMode<
	SettingEdgeInputBoardModeData,
	typeof settingEdgeInputBoardModeName
> {
	public constructor(
		index: number,
		mouseCursorInBoardPosition: Coordinates,
		output: Node<NodeState>,
	) {
		super(
			{index, mouseCursorInBoardPosition, output},
			settingEdgeInputBoardModeName,
		);
	}
}
