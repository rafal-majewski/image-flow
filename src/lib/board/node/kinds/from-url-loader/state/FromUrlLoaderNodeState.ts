import type {InvalidUrlFromUrlLoaderNodeState} from "./kinds/invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import type {LoadingInProgressFromUrlLoaderNodeState} from "./kinds/loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {NoUrlFromUrlLoaderNodeState} from "./kinds/no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {Edge} from "../../../../edge/Edge.ts";
export abstract class FromUrlLoaderNodeState {
	public readonly status: NodeStatus;
	protected constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract load(
		url: string,
		outputEdges: readonly Edge[],
	): LoadingInProgressFromUrlLoaderNodeState;
	public abstract setInvalidUrl(
		url: string,
		outputEdges: readonly Edge[],
	): InvalidUrlFromUrlLoaderNodeState;
	public abstract unsetUrl(
		outputEdges: readonly Edge[],
	): NoUrlFromUrlLoaderNodeState;
	public abstract handleNewOutputEdge(edge: Edge): void;
}
