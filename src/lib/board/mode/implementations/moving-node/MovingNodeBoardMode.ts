import type {Node} from "../../../node/Node.svelte.ts";
import {WithDataBoardMode} from "../../WithDataBoardMode.ts";
import type {MovingNodeBoardModeData} from "./data/MovingNodeBoardModeData.ts";
import {movingNodeBoardModeName} from "./name/movingNodeBoardModeName.ts";
export class MovingNodeBoardMode extends WithDataBoardMode<
	typeof movingNodeBoardModeName,
	MovingNodeBoardModeData
> {
	public constructor(node: Node<number>) {
		super({node}, movingNodeBoardModeName);
	}
}
