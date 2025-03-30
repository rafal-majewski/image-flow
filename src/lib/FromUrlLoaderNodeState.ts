import type {InvalidUrlFromUrlLoaderNodeState} from "./InvalidUrlFromUrlLoaderNodeState.ts";
import type {LoadingInProgressFromUrlLoaderNodeState} from "./LoadingInProgressFromUrlLoaderNodeState.ts";
import type {MapperNode} from "./MapperNode.svelte.ts";
import type {NodeStatus} from "./NodeStatus.ts";
import type {NoUrlFromUrlLoaderNodeState} from "./NoUrlFromUrlLoaderNodeState.ts";
import type {FromUrlLoaderNodeStateVisitor} from "./FromUrlLoaderNodeStateVisitor.ts";
export abstract class FromUrlLoaderNodeState {
	public readonly status: NodeStatus;
	protected constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract loadingInProgress(
		url: string,
		nextNodes: readonly MapperNode[],
	): LoadingInProgressFromUrlLoaderNodeState;
	public abstract invalidUrl(
		url: string,
		nextNodes: readonly MapperNode[],
	): InvalidUrlFromUrlLoaderNodeState;
	public abstract noUrl(
		nextNodes: readonly MapperNode[],
	): NoUrlFromUrlLoaderNodeState;
	public abstract acceptVisitor<Result>(
		visitor: FromUrlLoaderNodeStateVisitor<Result>,
	): Result;
}
