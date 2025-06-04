import type {Edge} from "../../../../../edge/Edge.ts";
import {NodeState} from "../../../state/NodeState.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {LoadingStartedFromUrlLoaderNodeState} from "./implementations/loading-started/LoadingStartedFromUrlLoaderNodeState.ts";
export abstract class FromUrlLoaderNodeState extends NodeState<0> {
	protected constructor(status: NodeStatus) {
		super(status);
	}
	public abstract startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromUrlLoaderNodeState;
}
