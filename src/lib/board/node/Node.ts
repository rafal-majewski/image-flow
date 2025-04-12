import type {Coordinates} from "../coordinates/Coordinates.ts";
import type {NodeId} from "./id/NodeId.ts";
import type {NodeStatus} from "./status/NodeStatus.ts";
export abstract class Node {
	public readonly position: Coordinates;
	public readonly id: NodeId;
	protected constructor(id: NodeId, position: Coordinates, status: NodeStatus) {
		this.position = position;
		this.id = id;
		this.status = status;
	}
	public readonly status: NodeStatus;
	public abstract readonly outputNodes: readonly Node[];
}
