import type {Operator} from "../operator/Operator.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import {NodeState} from "../../../state/NodeState.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
export abstract class OperatableNodeState<
	InputEdgeCount extends number,
> extends NodeState<InputEdgeCount> {
	public constructor(status: NodeStatus) {
		super(status);
	}
	public abstract doAnimatedStep(
		outputEdges: readonly Edge[],
	): OperatableNodeState<InputEdgeCount>;
	public abstract doManualSteps(
		outputEdges: readonly Edge[],
	): OperatableNodeState<InputEdgeCount>;
	public abstract makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): OperatableNodeState<InputEdgeCount>;
	public abstract makeInstant(
		outputEdges: readonly Edge[],
	): OperatableNodeState<InputEdgeCount>;
	public abstract makeManual(
		stepCount: number,
	): OperatableNodeState<InputEdgeCount>;
	public abstract resetOutputImage(
		outputEdges: readonly Edge[],
	): OperatableNodeState<InputEdgeCount>;
	public abstract setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): OperatableNodeState<InputEdgeCount>;
	public abstract setOperator<OperatorToUse extends Operator<InputEdgeCount>>(
		operator: OperatorToUse,
		outputEdges: readonly Edge[],
	): OperatableNodeState<InputEdgeCount>;
	public abstract setStepCount(
		stepCount: number,
	): OperatableNodeState<InputEdgeCount>;
	public abstract unsetOperator(
		outputEdges: readonly Edge[],
	): OperatableNodeState<InputEdgeCount>;
}
