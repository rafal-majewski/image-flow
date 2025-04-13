import type {Coordinates} from "../coordinates/Coordinates.ts";
import type {NodeId} from "./id/NodeId.ts";
import type {NodeStatus} from "./status/NodeStatus.ts";
export abstract class Node {
	protected constructor(id: NodeId, position: Coordinates) {
		this.id = id;
		this.position = position;
	}
	public readonly id: NodeId;
	public position: Coordinates = $state() as Coordinates;
	public abstract readonly status: NodeStatus;
	public abstract disconnect(): void;
}
