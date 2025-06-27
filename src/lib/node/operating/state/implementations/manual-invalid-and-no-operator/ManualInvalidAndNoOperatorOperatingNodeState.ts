import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedInvalidAndNoOperatorOperatingNodeState} from "../animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatingNodeState.ts";
import {InstantInvalidAndNoOperatorOperatingNodeState} from "../instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatingNodeState.ts";
import {ManualInvalidOperatingNodeState} from "../manual-invalid/ManualInvalidOperatingNodeState.ts";
import {ManualNoOperatorOperatingNodeState} from "../manual-no-operator/ManualNoOperatorOperatingNodeState.ts";
export class ManualInvalidAndNoOperatorOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(stepCount: number) {
		super("unconfigured");
		this.stepCount = stepCount;
	}
	public override doAnimatedStep(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override invalidateInputImages(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		return new AnimatedInvalidAndNoOperatorOperatingNodeState<InputImageCount>(
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly Edge[],
	): InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		return new InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount>();
	}
	public override makeManual(stepCount: number): this {
		return this;
	}
	public override resetOutputImage(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setOperator(
		operator: Operator<InputImageCount>,
		outputEdges: readonly Edge[],
	): ManualInvalidOperatingNodeState<InputImageCount> {
		return new ManualInvalidOperatingNodeState<InputImageCount>(
			operator,
			this.stepCount,
		);
	}
	public override setStepCount(
		newStepCount: number,
	): ManualInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		return new ManualInvalidAndNoOperatorOperatingNodeState<InputImageCount>(
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetOperator(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	): ManualNoOperatorOperatingNodeState<InputImageCount> {
		return new ManualNoOperatorOperatingNodeState<InputImageCount>(
			inputImages,
			this.stepCount,
		);
	}
}
