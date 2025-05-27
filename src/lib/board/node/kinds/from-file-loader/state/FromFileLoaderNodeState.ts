import type {OutputNode} from "../../../OutputNode.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {FromFileLoaderNode} from "../FromFileLoaderNode.svelte.ts";
import type {LoadingInProgressFromFileLoaderNodeState} from "./kinds/loading-in-progress/LoadingInProgressFromFileLoaderNodeState.ts";
export abstract class FromFileLoaderNodeState {
	public constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setFile(
		file: File,
		outputEdges: readonly OutputEdge[],
	): LoadingInProgressFromFileLoaderNodeState;
	public readonly status: NodeStatus;
	public abstract updateOutputEdgeAfterAdding(
		thisNode: FromFileLoaderNode,
		outputEdgeToUpdate: OutputEdge,
	): void;
}
