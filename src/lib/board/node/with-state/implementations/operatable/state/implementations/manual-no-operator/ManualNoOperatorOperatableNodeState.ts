import type {HandledEdgeBuilder} from "../../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../../edge/Edge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedNoOperatorOperatableNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatableNodeState.ts";
import {InstantNoOperatorOperatableNodeState} from "../instant-no-operator/InstantNoOperatorOperatableNodeState.ts";
import {ManualInvalidAndNoOperatorOperatableNodeState} from "../manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
import {ManualOperatingDonedOperatableNodeState} from "../manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
import {ManualOperatingStartedOperatableNodeState} from "../manual-operating-started/ManualOperatingStartedOperatableNodeState.ts";
export class ManualNoOperatorOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount> {
	public constructor(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		stepCount: number,
	) {
		super("unconfigured");
		this.inputImages = inputImages;
		this.stepCount = stepCount;
	}
	public override doAnimatedStep(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	public readonly inputImages: readonly ImageData[]
		& Readonly<{length: InputImageCount}>;
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.stepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly Edge[],
	): InstantNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
		);
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
	):
		| ManualOperatingStartedOperatableNodeState<InputImageCount>
		| ManualOperatingDonedOperatableNodeState<InputImageCount> {
		const generator = operator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
				this.inputImages,
				operator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingStartedOperatableNodeState<InputImageCount>(
				generator,
				this.inputImages,
				operator,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override setStepCount(
		newStepCount: number,
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetOperator(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		outputEdges: readonly Edge[],
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualNoOperatorOperatableNodeState<InputImageCount>(
			newInputImages,
			this.stepCount,
		);
	}
}
