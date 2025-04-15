import type {OutputNode} from "../../../OutputNode.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {FromFileLoaderNode} from "../FromFileLoaderNode.svelte.ts";
export abstract class FromFileLoaderNodeState {
	public readonly status: NodeStatus;
	public constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setFile(
		file: File,
		outputNodes: readonly OutputNode[],
	): FromFileLoaderNodeState;
	public abstract connectOutputNode(
		thisNode: FromFileLoaderNode,
		outputNodeToConnect: OutputNode,
	): void;
	public disconnect(
		thisNode: FromFileLoaderNode,
		outputNodes: readonly OutputNode[],
	): this {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNode();
		}
		return this;
	}
}
