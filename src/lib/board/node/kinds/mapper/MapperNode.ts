import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.ts";
import type {NodeId} from "../../id/NodeId.ts";
import type {NodeStatus} from "../../status/NodeStatus.ts";
export abstract class MapperNode extends Node {
	protected constructor(id: NodeId, position: Coordinates, status: NodeStatus) {
		super(id, position, status);
	}
}
