import type {HandledEdgeBuilder} from "../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {WithoutImageEdge} from "../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {WithImageEdge} from "../../edge/WithImageEdge.ts";
import type {OperatorId} from "../operator/id/OperatorId.ts";
import type {Operator} from "../operator/Operator.ts";
import type {NodeStatus} from "../status/NodeStatus.ts";
export abstract class NodeState<
	InputEdgeCount extends number,
	OutputEdgesToUse extends
		| readonly WithImageEdge[]
		| readonly WithoutImageEdge[],
> {
	public constructor(outputEdges: OutputEdgesToUse, status: NodeStatus) {
		this.outputEdges = outputEdges;
		this.status = status;
	}
	public abstract addOutputEdge(
		builder: HandledEdgeBuilder,
	): NodeState<InputEdgeCount, OutputEdgesToUse>;
	public abstract doAnimatedStep(): NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	>;
	public abstract doManualSteps(): NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	>;
	public abstract invalidateInputImages(): NodeState<
		InputEdgeCount,
		readonly WithoutImageEdge[]
	>;
	public abstract makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): NodeState<InputEdgeCount, OutputEdgesToUse>;
	public abstract makeInstant(): NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	>;
	public abstract makeManual(
		stepCount: number,
	): NodeState<InputEdgeCount, OutputEdgesToUse>;
	public readonly outputEdges: OutputEdgesToUse;
	public abstract resetOutputImage(): NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	>;
	public abstract setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): NodeState<InputEdgeCount, OutputEdgesToUse>;
	public abstract setOperator(
		operator: Operator<OperatorId, InputEdgeCount, string>,
	): NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	>;
	public abstract setStepCount(
		stepCount: number,
	): NodeState<InputEdgeCount, OutputEdgesToUse>;
	public abstract validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputEdgeCount}>,
	): NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	>;
	public readonly status: NodeStatus;
	public abstract unsetOperator(): NodeState<
		InputEdgeCount,
		readonly WithoutImageEdge[]
	>;
}
