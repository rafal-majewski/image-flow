import type {NodeId} from "../NodeId.ts";
export function generateNodeId(): NodeId {
	return Math.random().toString(36).substring(2, 15);
}
