import type {WithImageEdge} from "../../../edge/implementations/with-image/WithImageEdge.ts";
import type {WithoutImageEdge} from "../../../edge/implementations/without-image/WithoutImageEdge.ts";
import {NodeState} from "../../state/NodeState.ts";
import type {NodeStatus} from "../../status/NodeStatus.ts";
import type {WithFileFromFileLoaderNodeState} from "./WithFileFromFileLoaderNodeState.ts";
export abstract class FromFileLoaderNodeState<
	OutputEdge extends WithImageEdge | WithoutImageEdge,
> extends NodeState<0, OutputEdge> {
	protected constructor(
		outputEdges: readonly OutputEdge[],
		status: NodeStatus,
	) {
		super(outputEdges, status);
	}
	public abstract setFile(file: File): WithFileFromFileLoaderNodeState;
}
