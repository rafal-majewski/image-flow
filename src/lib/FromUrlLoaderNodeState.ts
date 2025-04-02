import type {InvalidUrlFromUrlLoaderNodeState} from "./InvalidUrlFromUrlLoaderNodeState.ts";
import type {LoadingInProgressFromUrlLoaderNodeState} from "./LoadingInProgressFromUrlLoaderNodeState.ts";
import type {NodeStatus} from "./NodeStatus.ts";
import type {NoUrlFromUrlLoaderNodeState} from "./NoUrlFromUrlLoaderNodeState.ts";
import type {FromUrlLoaderNodeStateVisitor} from "./FromUrlLoaderNodeStateVisitor.ts";
import type {Edge} from "./Edge.ts";
export abstract class FromUrlLoaderNodeState {
	public readonly status: NodeStatus;
	protected constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract loadingInProgress(
		url: string,
		outputEdges: readonly Edge[],
	): LoadingInProgressFromUrlLoaderNodeState;
	public abstract invalidUrl(
		url: string,
		outputEdges: readonly Edge[],
	): InvalidUrlFromUrlLoaderNodeState;
	public abstract noUrl(
		outputEdges: readonly Edge[],
	): NoUrlFromUrlLoaderNodeState;
	public abstract acceptVisitor<Result>(
		visitor: FromUrlLoaderNodeStateVisitor<Result>,
	): Result;
}
