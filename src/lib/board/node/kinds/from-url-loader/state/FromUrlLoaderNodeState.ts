import type {OutputNode} from "../../../OutputNode.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {FromUrlLoaderNode} from "../FromUrlLoaderNode.svelte.ts";
import type {InvalidUrlFromUrlLoaderNodeState} from "./kinds/invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import type {LoadingInProgressFromUrlLoaderNodeState} from "./kinds/loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
export abstract class FromUrlLoaderNodeState {
	public constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setInvalidUrl(
		url: string,
		outputEdges: readonly OutputEdge[],
	): InvalidUrlFromUrlLoaderNodeState;
	public abstract setValidUrl(
		url: string,
		outputEdges: readonly OutputEdge[],
	): LoadingInProgressFromUrlLoaderNodeState;
	public readonly status: NodeStatus;
	public abstract updateOutputEdgeAfterAdding(
		thisNode: FromUrlLoaderNode,
		outputEdgeToUpdate: OutputEdge,
	): void;
}
