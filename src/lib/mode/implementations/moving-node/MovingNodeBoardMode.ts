import type {Node} from "../../../node/Node.ts";
import {WithDataBoardMode} from "../../with-data/WithDataBoardMode.ts";
import type {MovingNodeBoardModeData} from "./data/MovingNodeBoardModeData.ts";
import {movingNodeBoardModeName} from "./name/movingNodeBoardModeName.ts";
export class MovingNodeBoardMode extends WithDataBoardMode<
	typeof movingNodeBoardModeName,
	MovingNodeBoardModeData
> {
	public constructor(node: Node) {
		super({node}, movingNodeBoardModeName);
	}
}
