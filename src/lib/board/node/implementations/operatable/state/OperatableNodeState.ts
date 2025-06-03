import type {WithImageEdge} from "../../../../edge/implementations/with-image/WithImageEdge.ts";
import type {WithoutImageEdge} from "../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../operator/Operator.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import {NodeState} from "../../../state/NodeState.ts";
export abstract class OperatableNodeState<
	InputEdgeCount extends number,
	OutputEdge extends WithImageEdge | WithoutImageEdge,
> extends NodeState<InputEdgeCount, OutputEdge> {
	public constructor(outputEdges: readonly OutputEdge[], status: NodeStatus) {
		super(outputEdges, status);
	}
	public abstract doAnimatedStep(): OperatableNodeState<
		InputEdgeCount,
		WithImageEdge | WithoutImageEdge
	>;
	public abstract doManualSteps(): OperatableNodeState<
		InputEdgeCount,
		WithImageEdge | WithoutImageEdge
	>;
	public abstract makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): OperatableNodeState<InputEdgeCount, OutputEdge>;
	public abstract makeInstant(): OperatableNodeState<
		InputEdgeCount,
		WithImageEdge | WithoutImageEdge
	>;
	public abstract makeManual(
		stepCount: number,
	): OperatableNodeState<InputEdgeCount, OutputEdge>;
	public abstract resetOutputImage(): OperatableNodeState<
		InputEdgeCount,
		WithImageEdge | WithoutImageEdge
	>;
	public abstract setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): OperatableNodeState<InputEdgeCount, OutputEdge>;
	public abstract setOperator<OperatorToUse extends Operator<InputEdgeCount>>(
		operator: OperatorToUse,
	): OperatableNodeState<InputEdgeCount, WithImageEdge | WithoutImageEdge>;
	public abstract setStepCount(
		stepCount: number,
	): OperatableNodeState<InputEdgeCount, OutputEdge>;
	public abstract unsetOperator(): OperatableNodeState<
		InputEdgeCount,
		WithoutImageEdge
	>;
}
