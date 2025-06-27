import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {Node} from "../../../node/Node.ts";
import {WithDataBoardMode} from "../../with-data/WithDataBoardMode.ts";
import type {SettingEdgeOutputBoardModeData} from "./data/SettingEdgeOutputBoardModeData.ts";
import {settingEdgeOutputBoardModeName} from "./name/settingEdgeOutputBoardModeName.ts";
export class SettingEdgeOutputBoardMode extends WithDataBoardMode<
	typeof settingEdgeOutputBoardModeName,
	SettingEdgeOutputBoardModeData
> {
	public constructor(input: Node, mouseCursorInBoardPosition: Coordinates) {
		super({input, mouseCursorInBoardPosition}, settingEdgeOutputBoardModeName);
	}
}
