import type {OutputEdge} from "../../../../edge/types/output/OutputEdge.ts";
import {NodeState} from "../../../state/NodeState.ts";
export abstract class CombinerNodeState extends NodeState {
	public abstract setCombiner(
		combiner: CombinerNodeState,
		outputEdges: readonly OutputEdge[],
	): CombinerNodeState;
	public abstract unsetFirstInputEdge(): CombinerNodeState;
	public abstract unsetFirstInputEdgeImage(): CombinerNodeState;
	public abstract unsetSecondInputEdge(): CombinerNodeState;
	public abstract unsetSecondInputEdgeImage(): CombinerNodeState;
}
