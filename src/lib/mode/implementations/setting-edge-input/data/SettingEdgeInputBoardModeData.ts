import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {OperatingNode} from "../../../../node/operating/OperatingNode.svelte.ts";
export type SettingEdgeInputBoardModeData = {
	readonly index: number;
	readonly mouseCursorInBoardPosition: Coordinates;
	readonly output: OperatingNode<number>;
};
