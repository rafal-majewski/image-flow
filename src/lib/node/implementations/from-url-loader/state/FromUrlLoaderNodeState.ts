import type {Edge} from "../../../../edge/Edge.ts";
import {NodeState} from "../../../state/NodeState.ts";
import type {NodeStateStatus} from "../../../state/status/NodeStateStatus.ts";
import type {LoadingStartedFromUrlLoaderNodeState} from "./implementations/loading-started/LoadingStartedFromUrlLoaderNodeState.ts";
export abstract class FromUrlLoaderNodeState extends NodeState {
	protected constructor(status: NodeStateStatus) {
		super(status);
	}
	public abstract startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromUrlLoaderNodeState;
}
