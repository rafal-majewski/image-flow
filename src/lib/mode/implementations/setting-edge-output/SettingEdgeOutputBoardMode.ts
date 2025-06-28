import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {Node} from "../../../node/Node.svelte.ts";
import type {NodeState} from "../../../node/state/NodeState.ts";
import {WithDataBoardMode} from "../../with-data/WithDataBoardMode.ts";
import type {SettingEdgeOutputBoardModeData} from "./data/SettingEdgeOutputBoardModeData.ts";
import {settingEdgeOutputBoardModeName} from "./name/settingEdgeOutputBoardModeName.ts";
export class SettingEdgeOutputBoardMode extends WithDataBoardMode<
	SettingEdgeOutputBoardModeData,
	typeof settingEdgeOutputBoardModeName
> {
	public constructor(
		input: Node<NodeState>,
		mouseCursorInBoardPosition: Coordinates,
	) {
		super({input, mouseCursorInBoardPosition}, settingEdgeOutputBoardModeName);
	}
}
