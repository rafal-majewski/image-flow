import type {HandledEdgeBuilder} from "../../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../../edge/Edge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidOperatableNodeState} from "../animated-invalid/AnimatedInvalidOperatableNodeState.ts";
import {InstantInvalidOperatableNodeState} from "../instant-invalid/InstantInvalidOperatableNodeState.ts";
import {ManualInvalidAndNoOperatorOperatableNodeState} from "../manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
import {ManualOperatingDonedOperatableNodeState} from "../manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
import {ManualOperatingStartedOperatableNodeState} from "../manual-operating-started/ManualOperatingStartedOperatableNodeState.ts";
export class ManualInvalidOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount> {
	public constructor(operator: Operator<InputImageCount>, stepCount: number) {
		super("unconfigured");
		this.operator = operator;
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
	): AnimatedInvalidOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidOperatableNodeState<InputImageCount>(
			intervalId,
			intervalIntervalSeconds,
			this.operator,
		);
	}
	public override makeInstant(
		outputEdges: readonly Edge[],
	): InstantInvalidOperatableNodeState<InputImageCount> {
		return new InstantInvalidOperatableNodeState<InputImageCount>(
			this.operator,
		);
	}
	public override makeManual(stepCount: number): this {
		return this;
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
	): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			newOperator,
			this.stepCount,
		);
	}
	public override setStepCount(
		newStepCount: number,
	): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetOperator(
		outputEdges: readonly Edge[],
	): ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.stepCount,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		outputEdges: readonly Edge[],
	):
		| ManualOperatingStartedOperatableNodeState<InputImageCount>
		| ManualOperatingDonedOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
				inputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingStartedOperatableNodeState<InputImageCount>(
				generator,
				inputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
}
