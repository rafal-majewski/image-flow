import type {SupportedNode} from "../../../node/supported/SupportedNode.ts";
import {WithDataBoardMode} from "../../WithDataBoardMode.ts";
import type {MovingNodeBoardModeData} from "./data/MovingNodeBoardModeData.ts";
import {movingNodeBoardModeKindName} from "./kind-name/movingNodeBoardModeKindName.ts";
export class MovingNodeBoardMode extends WithDataBoardMode<
	typeof movingNodeBoardModeKindName,
	MovingNodeBoardModeData
> {
	public constructor(node: SupportedNode) {
		super({node}, movingNodeBoardModeKindName);
	}
}
