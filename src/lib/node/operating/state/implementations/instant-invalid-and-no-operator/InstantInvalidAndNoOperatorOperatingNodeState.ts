import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedInvalidAndNoOperatorOperatingNodeState} from "../animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatingNodeState.ts";
import {InstantInvalidOperatingNodeState} from "../instant-invalid/InstantInvalidOperatingNodeState.ts";
import {InstantNoOperatorOperatingNodeState} from "../instant-no-operator/InstantNoOperatorOperatingNodeState.ts";
import {ManualInvalidAndNoOperatorOperatingNodeState} from "../manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatingNodeState.ts";
export class InstantInvalidAndNoOperatorOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor() {
		super("unconfigured");
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
	public override makeInstant(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		return new ManualInvalidAndNoOperatorOperatingNodeState<InputImageCount>(
			stepCount,
		);
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
	): InstantInvalidOperatingNodeState<InputImageCount> {
		return new InstantInvalidOperatingNodeState<InputImageCount>(operator);
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
	): InstantNoOperatorOperatingNodeState<InputImageCount> {
		return new InstantNoOperatorOperatingNodeState<InputImageCount>(
			inputImages,
		);
	}
}
