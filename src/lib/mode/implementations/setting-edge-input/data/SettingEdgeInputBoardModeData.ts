import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {Node} from "../../../../node/Node.svelte.ts";
import type {NodeState} from "../../../../node/state/NodeState.ts";
export type SettingEdgeInputBoardModeData = {
	readonly index: number;
	readonly mouseCursorInBoardPosition: Coordinates;
	readonly output: Node<NodeState>;
};
