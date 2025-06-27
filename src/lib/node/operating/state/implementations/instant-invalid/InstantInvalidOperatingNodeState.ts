import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedInvalidOperatingNodeState} from "../animated-invalid/AnimatedInvalidOperatingNodeState.ts";
import {InstantInvalidAndNoOperatorOperatingNodeState} from "../instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatingNodeState.ts";
import {InstantOperatingDonedOperatingNodeState} from "../instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
import {ManualInvalidOperatingNodeState} from "../manual-invalid/ManualInvalidOperatingNodeState.ts";
export class InstantInvalidOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(operator: Operator<InputImageCount>) {
		super("unconfigured");
		this.operator = operator;
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
	): AnimatedInvalidOperatingNodeState<InputImageCount> {
		return new AnimatedInvalidOperatingNodeState<InputImageCount>(
			intervalId,
			intervalIntervalSeconds,
			this.operator,
		);
	}
	public override makeInstant(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualInvalidOperatingNodeState<InputImageCount> {
		return new ManualInvalidOperatingNodeState<InputImageCount>(
			this.operator,
			stepCount,
		);
	}
	public readonly operator: Operator<InputImageCount>;
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
		newOperator: Operator<InputImageCount>,
		outputEdges: readonly Edge[],
	): InstantInvalidOperatingNodeState<InputImageCount> {
		return new InstantInvalidOperatingNodeState<InputImageCount>(newOperator);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(
		outputEdges: readonly Edge[],
	): InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		return new InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount>();
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	): InstantOperatingDonedOperatingNodeState<InputImageCount> {
		const generator = this.operator.operate(inputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		for (const edge of outputEdges) {
			edge.setImage(generatorResult.value);
		}
		return new InstantOperatingDonedOperatingNodeState<InputImageCount>(
			inputImages,
			this.operator,
			generatorResult.value,
		);
	}
}
