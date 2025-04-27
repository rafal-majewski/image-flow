import type {OutputNode} from "../../../OutputNode.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {FromUrlLoaderNode} from "../FromUrlLoaderNode.svelte.ts";
export abstract class FromUrlLoaderNodeState {
	public readonly status: NodeStatus;
	public constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setValidUrl(
		url: string,
		outputNodes: readonly OutputNode[],
	): FromUrlLoaderNodeState;
	public abstract setInvalidUrl(
		url: string,
		outputNodes: readonly OutputNode[],
	): FromUrlLoaderNodeState;
	public abstract updateOutputNodeAfterAdding(
		thisNode: FromUrlLoaderNode,
		outputNodeToUpdate: OutputNode,
	): void;
}
