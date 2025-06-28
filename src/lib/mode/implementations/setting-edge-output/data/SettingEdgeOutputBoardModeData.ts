import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {Node} from "../../../../node/Node.svelte.ts";
import type {NodeState} from "../../../../node/state/NodeState.ts";
export type SettingEdgeOutputBoardModeData = {
	readonly input: Node<NodeState>;
	readonly mouseCursorInBoardPosition: Coordinates;
};
