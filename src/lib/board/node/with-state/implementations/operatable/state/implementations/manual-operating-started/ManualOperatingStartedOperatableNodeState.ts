import type {HandledEdgeBuilder} from "../../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../../edge/Edge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedOperatingStartedOperatableNodeState} from "../animated-operating-started/AnimatedOperatingStartedOperatableNodeState.ts";
import {InstantOperatingDonedOperatableNodeState} from "../instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import {ManualInvalidOperatableNodeState} from "../manual-invalid/ManualInvalidOperatableNodeState.ts";
import {ManualNoOperatorOperatableNodeState} from "../manual-no-operator/ManualNoOperatorOperatableNodeState.ts";
import {ManualOperatingDonedOperatableNodeState} from "../manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
export class ManualOperatingStartedOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount> {
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		operator: Operator<InputImageCount>,
		outputImage: ImageData,
		stepCount: number,
	) {
		super("started");
		this.generator = generator;
		this.inputImages = inputImages;
		this.operator = operator;
		this.outputImage = outputImage;
		this.stepCount = stepCount;
	}
	public override doAnimatedStep(
		outputEdges: readonly Edge[],
	):
		| ManualOperatingDonedOperatableNodeState<InputImageCount>
		| ManualOperatingStartedOperatableNodeState<InputImageCount> {
		const generatorResult = this.generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingStartedOperatableNodeState<InputImageCount>(
				this.generator,
				this.inputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override doManualSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	public readonly inputImages: readonly ImageData[]
		& Readonly<{length: InputImageCount}>;
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			this.stepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedOperatingStartedOperatableNodeState<InputImageCount> {
		return new AnimatedOperatingStartedOperatableNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			intervalId,
			intervalIntervalSeconds,
			this.operator,
			this.outputImage,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override makeInstant(
		outputEdges: readonly Edge[],
	): InstantOperatingDonedOperatableNodeState<InputImageCount> {
		let generatorResult = this.generator.next();
		while (!generatorResult.done) {
			generatorResult = this.generator.next();
		}
		for (const edge of outputEdges) {
			edge.setImage(generatorResult.value);
		}
		return new InstantOperatingDonedOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			generatorResult.value,
		);
	}
	public override makeManual(stepCount: number): this {
		return this;
	}
	public readonly operator: Operator<InputImageCount>;
	public readonly outputImage: ImageData;
	public override resetOutputImage(
		outputEdges: readonly Edge[],
	):
		| ManualOperatingDonedOperatableNodeState<InputImageCount>
		| ManualOperatingStartedOperatableNodeState<InputImageCount> {
		const newGenerator = this.operator.operate(this.inputImages);
		const generatorResult = newGenerator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingStartedOperatableNodeState<InputImageCount>(
				newGenerator,
				this.inputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		}
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
	):
		| ManualOperatingDonedOperatableNodeState<InputImageCount>
		| ManualOperatingStartedOperatableNodeState<InputImageCount> {
		const newGenerator = newOperator.operate(this.inputImages);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(newGeneratorResult.value);
			}
			return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
				this.inputImages,
				newOperator,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingStartedOperatableNodeState<InputImageCount>(
				newGenerator,
				this.inputImages,
				newOperator,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setStepCount(
		newStepCount: number,
	): ManualOperatingStartedOperatableNodeState<InputImageCount> {
		return new ManualOperatingStartedOperatableNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			this.operator,
			this.outputImage,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetOperator(
		outputEdges: readonly Edge[],
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.stepCount,
		);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		outputEdges: readonly Edge[],
	):
		| ManualOperatingDonedOperatableNodeState<InputImageCount>
		| ManualOperatingStartedOperatableNodeState<InputImageCount> {
		const newGenerator = this.operator.operate(newInputImages);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(newGeneratorResult.value);
			}
			return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
				newInputImages,
				this.operator,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingStartedOperatableNodeState<InputImageCount>(
				newGenerator,
				newInputImages,
				this.operator,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
}
