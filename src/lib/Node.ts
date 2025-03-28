import type {Coordinates} from "./Coordinates.ts";
import type {NodeStatus} from "./NodeStatus.ts";
export interface Node {
	readonly name: string;
	readonly id: string;
	readonly position: Coordinates;
	readonly status: NodeStatus;
}
