import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedInvalidOperatingNodeState} from "../animated-invalid/AnimatedInvalidOperatingNodeState.ts";
import {AnimatedNoOperatorOperatingNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatingNodeState.ts";
import {InstantInvalidAndNoOperatorOperatingNodeState} from "../instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatingNodeState.ts";
import {ManualInvalidAndNoOperatorOperatingNodeState} from "../manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatingNodeState.ts";
export class AnimatedInvalidAndNoOperatorOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
	}
	public override doAnimatedStep(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override invalidateInputImages(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override makeInstant(
		outputEdges: readonly Edge[],
	): InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount>();
	}
	public override makeManual(
		stepCount: number,
	): ManualInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new ManualInvalidAndNoOperatorOperatingNodeState<InputImageCount>(
			stepCount,
		);
	}
	public override resetOutputImage(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedInvalidAndNoOperatorOperatingNodeState<InputImageCount>(
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override setOperator(
		operator: Operator<InputImageCount>,
		outputEdges: readonly Edge[],
	): AnimatedInvalidOperatingNodeState<InputImageCount> {
		return new AnimatedInvalidOperatingNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			operator,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	): AnimatedNoOperatorOperatingNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatingNodeState<InputImageCount>(
			inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
}
