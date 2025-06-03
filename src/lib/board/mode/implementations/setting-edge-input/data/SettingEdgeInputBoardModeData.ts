import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {Node} from "../../../../node/Node.svelte.ts";
export type SettingEdgeInputBoardModeData = Readonly<{
	index: number;
	mouseCursorInBoardPosition: Coordinates;
	output: Node<number>;
}>;
