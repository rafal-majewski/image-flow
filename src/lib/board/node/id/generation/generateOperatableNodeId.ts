import type {OperatableNodeId} from "../OperatableNodeId.ts";
export function generateOperatableNodeId(): OperatableNodeId {
	return Math.random().toString(36).substring(2, 15);
}
