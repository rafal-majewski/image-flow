import type {Edge} from "../../../../edge/Edge.ts";
import {NodeState} from "../../../state/NodeState.ts";
import type {NodeStateStatus} from "../../../state/status/NodeStateStatus.ts";
import type {LoadingStartedFromFileLoaderNodeState} from "./implementations/loading-started/LoadingStartedFromFileLoaderNodeState.ts";
export abstract class FromFileLoaderNodeState extends NodeState {
	protected constructor(status: NodeStateStatus) {
		super(status);
	}
	public abstract startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromFileLoaderNodeState;
}
