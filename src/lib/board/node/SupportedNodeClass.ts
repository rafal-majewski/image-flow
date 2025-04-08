import type {Coordinates} from "../coordinates/Coordinates.ts";
import type {NodeId} from "./id/NodeId.ts";
import type {SupportedNode} from "./SupportedNode.ts";
export type SupportedNodeClass = new (
	position: Coordinates,
	id: NodeId,
) => SupportedNode;
