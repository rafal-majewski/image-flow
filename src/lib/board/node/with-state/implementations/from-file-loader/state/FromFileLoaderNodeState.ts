import type {Edge} from "../../../../../edge/Edge.ts";
import {NodeState} from "../../../state/NodeState.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {LoadingStartedFromFileLoaderNodeState} from "./implementations/loading-started/LoadingStartedFromFileLoaderNodeState.ts";
export abstract class FromFileLoaderNodeState extends NodeState<0> {
	protected constructor(status: NodeStatus) {
		super(status);
	}
	public abstract startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromFileLoaderNodeState;
}
