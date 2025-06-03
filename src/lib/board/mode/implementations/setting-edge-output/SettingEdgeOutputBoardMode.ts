import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {Node} from "../../../node/Node.svelte.ts";
import {WithDataBoardMode} from "../../WithDataBoardMode.ts";
import type {SettingEdgeOutputBoardModeData} from "./data/SettingEdgeOutputBoardModeData.ts";
import {settingEdgeOutputBoardModeName} from "./name/settingEdgeOutputBoardModeName.ts";
export class SettingEdgeOutputBoardMode extends WithDataBoardMode<
	typeof settingEdgeOutputBoardModeName,
	SettingEdgeOutputBoardModeData
> {
	public constructor(
		input: Node<number>,
		mouseCursorInBoardPosition: Coordinates,
	) {
		super({input, mouseCursorInBoardPosition}, settingEdgeOutputBoardModeName);
	}
}
