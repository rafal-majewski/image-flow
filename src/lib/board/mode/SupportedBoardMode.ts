import type {Coordinates} from "../coordinates/Coordinates.ts";
import type {MapperNode} from "../node/kinds/mapper/MapperNode.svelte.ts";
import type {SupportedNode} from "../node/SupportedNode.ts";
export type SupportedBoardMode =
	| Readonly<{kind: "movingCamera"}>
	| Readonly<{kind: "movingNode"; data: Readonly<{node: SupportedNode}>}>
	| Readonly<{
			kind: "settingOutputNode";
			data: Readonly<{sourceNode: SupportedNode; targetPosition: Coordinates}>;
	  }>
	| Readonly<{
			kind: "settingInputNode";
			data: Readonly<{targetNode: MapperNode; sourcePosition: Coordinates}>;
	  }>
	| Readonly<{kind: "addingNode"; data: Readonly<{position: Coordinates}>}>;
