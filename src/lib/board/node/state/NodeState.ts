import type {HandledEdgeBuilder} from "../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../edge/Edge.ts";
import type {WithImageEdge} from "../../edge/implementations/with-image/WithImageEdge.ts";
import type {WithoutImageEdge} from "../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {NodeStatus} from "../status/NodeStatus.ts";
export abstract class NodeState<
	InputEdgeCount extends number,
	OutputEdge extends WithImageEdge | WithoutImageEdge,
> {
	protected constructor(
		outputEdges: readonly OutputEdge[],
		status: NodeStatus,
	) {
		this.outputEdges = outputEdges;
		this.status = status;
	}
	// TODO: Implement this method partially here
	// TODO: Adding output edges will break when image is loading in FromFileLoaderNode
	public abstract addOutputEdge(
		builder: HandledEdgeBuilder,
	): NodeState<InputEdgeCount, OutputEdge>;
	// TODO: Implement this method partially here
	public abstract deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): NodeState<InputEdgeCount, OutputEdge>;
	public abstract invalidateInputImages(): NodeState<
		InputEdgeCount,
		WithoutImageEdge
	>;
	public readonly outputEdges: readonly OutputEdge[];
	public readonly status: NodeStatus;
	public abstract validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputEdgeCount}>,
	): NodeState<InputEdgeCount, WithImageEdge | WithoutImageEdge>;
}
