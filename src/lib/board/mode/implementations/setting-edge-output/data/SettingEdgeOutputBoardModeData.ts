import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {Node} from "../../../../node/Node.svelte.ts";
export type SettingEdgeOutputBoardModeData = Readonly<{
	input: Node<number>;
	mouseCursorInBoardPosition: Coordinates;
}>;
