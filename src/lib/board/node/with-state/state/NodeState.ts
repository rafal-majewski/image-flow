import type {HandledEdgeBuilder} from "../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../edge/Edge.ts";
import type {NodeStatus} from "../status/NodeStatus.ts";
export abstract class NodeState<InputEdgeCount extends number> {
	protected constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract invalidateInputImages(
		outputEdges: readonly Edge[],
	): NodeState<InputEdgeCount>;
	public readonly status: NodeStatus;
	public abstract validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputEdgeCount}>,
		outputEdges: readonly Edge[],
	): NodeState<InputEdgeCount>;
	public abstract useEdgeBuilder(builder: HandledEdgeBuilder): void;
}
