import {NodeState} from "../../state/NodeState.ts";
import type {Edge} from "../../../edge/Edge.ts";
import type {NodeStateStatus} from "../../state/status/NodeStateStatus.ts";
import type {Operator} from "../../operator/Operator.ts";
export abstract class OperatingNodeState<
	InputEdgeCount extends number,
> extends NodeState {
	public constructor(status: NodeStateStatus) {
		super(status);
	}
	public abstract doAnimatedSteps(
		outputEdges: readonly Edge[],
	): OperatingNodeState<InputEdgeCount>;
	public abstract doInstantSteps(
		outputEdges: readonly Edge[],
	): OperatingNodeState<InputEdgeCount>;
	public abstract doManualSteps(
		outputEdges: readonly Edge[],
	): OperatingNodeState<InputEdgeCount>;
	public abstract invalidateInputImages(
		outputEdges: readonly Edge[],
	): OperatingNodeState<InputEdgeCount>;
	public abstract makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): OperatingNodeState<InputEdgeCount>;
	public abstract makeInstant(
		intervalId: ReturnType<typeof setInterval>,
		outputEdges: readonly Edge[],
	): OperatingNodeState<InputEdgeCount>;
	public abstract makeManual(
		stepCount: number,
	): OperatingNodeState<InputEdgeCount>;
	public abstract resetOutputImage(
		outputEdges: readonly Edge[],
	): OperatingNodeState<InputEdgeCount>;
	public abstract setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): OperatingNodeState<InputEdgeCount>;
	public abstract setOperator(
		operator: Operator<InputEdgeCount>,
		outputEdges: readonly Edge[],
	): OperatingNodeState<InputEdgeCount>;
	public abstract setStepCount(
		stepCount: number,
	): OperatingNodeState<InputEdgeCount>;
	public abstract unsetOperator(
		outputEdges: readonly Edge[],
	): OperatingNodeState<InputEdgeCount>;
	public abstract validateInputImages(
		inputImages: readonly ImageData[] & {readonly length: InputEdgeCount},
		outputEdges: readonly Edge[],
	): OperatingNodeState<InputEdgeCount>;
}
