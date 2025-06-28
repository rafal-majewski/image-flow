import type {Node} from "../../../node/Node.svelte.ts";
import type {NodeState} from "../../../node/state/NodeState.ts";
import {WithDataBoardMode} from "../../with-data/WithDataBoardMode.ts";
import type {MovingNodeBoardModeData} from "./data/MovingNodeBoardModeData.ts";
import {movingNodeBoardModeName} from "./name/movingNodeBoardModeName.ts";
export class MovingNodeBoardMode extends WithDataBoardMode<
	MovingNodeBoardModeData,
	typeof movingNodeBoardModeName
> {
	public constructor(node: Node<NodeState>) {
		super({node}, movingNodeBoardModeName);
	}
}
