import type {InvalidUrlFromUrlLoaderNodeState} from "./kinds/invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import type {LoadingInProgressFromUrlLoaderNodeState} from "./kinds/loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {NoUrlFromUrlLoaderNodeState} from "./kinds/no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {MapperNode} from "../../../kinds/mapper/MapperNode.svelte.ts";
export abstract class FromUrlLoaderNodeState {
	public readonly status: NodeStatus;
	protected constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract load(
		url: string,
		outputNodes: readonly MapperNode[],
	): LoadingInProgressFromUrlLoaderNodeState;
	public abstract setInvalidUrl(
		url: string,
		outputNodes: readonly MapperNode[],
	): InvalidUrlFromUrlLoaderNodeState;
	public abstract unsetUrl(
		outputNodes: readonly MapperNode[],
	): NoUrlFromUrlLoaderNodeState;
	public abstract handleNewOutputNode(outputNode: MapperNode): void;
}
