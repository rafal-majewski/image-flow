import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedInvalidOperatingNodeState} from "../animated-invalid/AnimatedInvalidOperatingNodeState.ts";
import {AnimatedNoOperatorOperatingNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatingNodeState.ts";
import {AnimatedOperatingDonedOperatingNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatingNodeState.ts";
import {InstantOperatingDonedOperatingNodeState} from "../instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
import {ManualOperatingStartedOperatingNodeState} from "../manual-operating-started/ManualOperatingStartedOperatingNodeState.ts";
export class AnimatedOperatingStartedOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		operator: Operator<InputImageCount>,
		outputImage: ImageData,
	) {
		super("started");
		this.generator = generator;
		this.inputImages = inputImages;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.operator = operator;
		this.outputImage = outputImage;
	}
	public override doAnimatedStep(
		outputEdges: readonly Edge[],
	):
		| AnimatedOperatingDonedOperatingNodeState<InputImageCount>
		| AnimatedOperatingStartedOperatingNodeState<InputImageCount> {
		const generatorResult = this.generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new AnimatedOperatingDonedOperatingNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				generatorResult.value,
			);
		} else {
			return new AnimatedOperatingStartedOperatingNodeState<InputImageCount>(
				this.generator,
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				generatorResult.value,
			);
		}
	}
	public override doManualSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	public readonly inputImages: readonly ImageData[] & {
		readonly length: InputImageCount;
	};
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): AnimatedInvalidOperatingNodeState<InputImageCount> {
		return new AnimatedInvalidOperatingNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.operator,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override makeInstant(
		outputEdges: readonly Edge[],
	): InstantOperatingDonedOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		let generatorResult = this.generator.next();
		while (!generatorResult.done) {
			generatorResult = this.generator.next();
		}
		for (const edge of outputEdges) {
			edge.setImage(generatorResult.value);
		}
		return new InstantOperatingDonedOperatingNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			generatorResult.value,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualOperatingStartedOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new ManualOperatingStartedOperatingNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			this.operator,
			this.outputImage,
			stepCount,
		);
	}
	public readonly operator: Operator<InputImageCount>;
	public readonly outputImage: ImageData;
	public override resetOutputImage(
		outputEdges: readonly Edge[],
	):
		| AnimatedOperatingDonedOperatingNodeState<InputImageCount>
		| AnimatedOperatingStartedOperatingNodeState<InputImageCount> {
		const newGenerator = this.operator.operate(this.inputImages);
		const generatorResult = newGenerator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new AnimatedOperatingDonedOperatingNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				generatorResult.value,
			);
		} else {
			return new AnimatedOperatingStartedOperatingNodeState<InputImageCount>(
				newGenerator,
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				generatorResult.value,
			);
		}
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedOperatingStartedOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedOperatingStartedOperatingNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.operator,
			this.outputImage,
		);
	}
	public override setOperator(
		newOperator: Operator<InputImageCount>,
		outputEdges: readonly Edge[],
	):
		| AnimatedOperatingDonedOperatingNodeState<InputImageCount>
		| AnimatedOperatingStartedOperatingNodeState<InputImageCount> {
		const newGenerator = newOperator.operate(this.inputImages);
		const generatorResult = newGenerator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new AnimatedOperatingDonedOperatingNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				newOperator,
				generatorResult.value,
			);
		} else {
			return new AnimatedOperatingStartedOperatingNodeState<InputImageCount>(
				newGenerator,
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				newOperator,
				generatorResult.value,
			);
		}
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(
		outputEdges: readonly Edge[],
	): AnimatedNoOperatorOperatingNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	):
		| AnimatedOperatingDonedOperatingNodeState<InputImageCount>
		| AnimatedOperatingStartedOperatingNodeState<InputImageCount> {
		const newGenerator = this.operator.operate(newInputImages);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(newGeneratorResult.value);
			}
			return new AnimatedOperatingDonedOperatingNodeState<InputImageCount>(
				newInputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedOperatingStartedOperatingNodeState<InputImageCount>(
				newGenerator,
				newInputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				newGeneratorResult.value,
			);
		}
	}
}
