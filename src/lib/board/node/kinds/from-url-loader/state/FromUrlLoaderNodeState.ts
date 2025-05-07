import type {OutputNode} from "../../../OutputNode.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {FromUrlLoaderNode} from "../FromUrlLoaderNode.svelte.ts";
import type {InvalidUrlFromUrlLoaderNodeState} from "./kinds/invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import type {LoadingInProgressFromUrlLoaderNodeState} from "./kinds/loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
export abstract class FromUrlLoaderNodeState {
	public readonly status: NodeStatus;
	public constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setValidUrl(
		url: string,
		outputNodes: readonly OutputNode[],
	): LoadingInProgressFromUrlLoaderNodeState;
	public abstract setInvalidUrl(
		url: string,
		outputNodes: readonly OutputNode[],
	): InvalidUrlFromUrlLoaderNodeState;
	public abstract updateOutputNodeAfterAdding(
		thisNode: FromUrlLoaderNode,
		outputNodeToUpdate: OutputNode,
	): void;
}
