import type {Node} from "../../../node/Node.svelte.ts";
import type {BoardMode} from "../../BoardMode.ts";
export type MovingNodeBoardMode = BoardMode<
	"movingNode",
	Readonly<{node: Node}>
>;
