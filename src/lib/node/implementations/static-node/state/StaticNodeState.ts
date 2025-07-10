import type {Edge} from "../../../../edge/Edge.ts";
import {NodeState} from "../../../state/NodeState.ts";
import type {NodeStateStatus} from "../../../state/status/NodeStateStatus.ts";
import type {LoadingStartedStaticNodeState} from "./implementations/loading-started/LoadingStartedStaticNodeState.ts";
export abstract class StaticNodeState extends NodeState {
	protected constructor(status: NodeStateStatus) {
		super(status);
	}
	public abstract startLoading(
		imageFilePath: string,
		outputEdges: readonly Edge[],
	): LoadingStartedStaticNodeState;
}
