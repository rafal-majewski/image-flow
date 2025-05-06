import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {Node} from "../../../../node/Node.svelte.ts";
export type SettingOutputNodeBoardModeData = Readonly<{
	sourceNode: Node;
	targetPosition: Coordinates;
}>;
