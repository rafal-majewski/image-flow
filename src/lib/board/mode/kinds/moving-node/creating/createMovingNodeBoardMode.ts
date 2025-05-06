import type {Node} from "../../../../node/Node.svelte.ts";
import {createBoardModeWithData} from "../../../types/with-data/creating/createBoardModeWithData.ts";
import {movingNodeBoardModeKindName} from "../kind-name/movingNodeBoardModeKindName.ts";
import type {MovingNodeBoardMode} from "../MovingNodeBoardMode.ts";
export function createMovingNodeBoardMode(node: Node): MovingNodeBoardMode {
	return createBoardModeWithData(movingNodeBoardModeKindName, {node});
}
