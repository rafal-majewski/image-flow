import type {SupportedNode} from "../../../node/SupportedNode.ts";
import type {BoardMode} from "../../BoardMode.ts";
export type MovingNodeBoardMode = BoardMode<
	"movingNode",
	Readonly<{node: SupportedNode}>
>;
