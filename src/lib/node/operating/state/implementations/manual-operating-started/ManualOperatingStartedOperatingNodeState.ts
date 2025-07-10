import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedOperatingStartedOperatingNodeState} from "../animated-operating-started/AnimatedOperatingStartedOperatingNodeState.ts";
import {InstantOperatingDoneOperatingNodeState} from "../instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
import {InstantOperatingStartedOperatingNodeState} from "../instant-operating-started/InstantOperatingStartedOperatingNodeState.ts";
import {ManualInvalidOperatingNodeState} from "../manual-invalid/ManualInvalidOperatingNodeState.ts";
import {ManualNoOperatorOperatingNodeState} from "../manual-no-operator/ManualNoOperatorOperatingNodeState.ts";
import {ManualOperatingDoneOperatingNodeState} from "../manual-operating-done/ManualOperatingDoneOperatingNodeState.ts";
export class ManualOperatingStartedOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
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
	public override doAnimatedSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override doInstantSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override doManualSteps(
		outputEdges: readonly Edge[],
	):
		| ManualOperatingDoneOperatingNodeState<InputImageCount>
		| ManualOperatingStartedOperatingNodeState<InputImageCount> {
		let generatorResult = this.generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDoneOperatingNodeState<InputImageCount>(
				this.inputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			for (
				let stepIndex = 1;
				stepIndex < this.stepCount;
				stepIndex = stepIndex + 1
			) {
				generatorResult = this.generator.next();
				if (generatorResult.done) {
					for (const edge of outputEdges) {
						edge.setImage(generatorResult.value);
					}
					return new ManualOperatingDoneOperatingNodeState<InputImageCount>(
						this.inputImages,
						this.operator,
						generatorResult.value,
						this.stepCount,
					);
				}
			}
			return new ManualOperatingStartedOperatingNodeState<InputImageCount>(
				this.generator,
				this.inputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	public readonly inputImages: readonly ImageData[] & {
		readonly length: InputImageCount;
	};
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): ManualInvalidOperatingNodeState<InputImageCount> {
		return new ManualInvalidOperatingNodeState<InputImageCount>(
			this.operator,
			this.stepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedOperatingStartedOperatingNodeState<InputImageCount> {
		return new AnimatedOperatingStartedOperatingNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			intervalId,
			intervalIntervalSeconds,
			this.operator,
			this.outputImage,
		);
	}
	public override makeInstant(
		intervalId: ReturnType<typeof setInterval>,
		outputEdges: readonly Edge[],
	):
		| InstantOperatingDoneOperatingNodeState<InputImageCount>
		| InstantOperatingStartedOperatingNodeState<InputImageCount> {
		const timestamp = new Date();
		let generatorResult = this.generator.next();
		while (
			!generatorResult.done
			&& (new Date().getTime() - timestamp.getTime()) / 1000 < 0.1
		) {
			generatorResult = this.generator.next();
		}
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new InstantOperatingDoneOperatingNodeState<InputImageCount>(
				intervalId,
				this.inputImages,
				this.operator,
				generatorResult.value,
			);
		} else {
			return new InstantOperatingStartedOperatingNodeState<InputImageCount>(
				intervalId,
				this.generator,
				this.inputImages,
				this.operator,
				this.outputImage,
			);
		}
	}
	public override makeManual(stepCount: number): this {
		return this;
	}
	public readonly operator: Operator<InputImageCount>;
	public readonly outputImage: ImageData;
	public override resetOutputImage(
		outputEdges: readonly Edge[],
	):
		| ManualOperatingDoneOperatingNodeState<InputImageCount>
		| ManualOperatingStartedOperatingNodeState<InputImageCount> {
		const newGenerator = this.operator.operate(this.inputImages);
		const generatorResult = newGenerator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDoneOperatingNodeState<InputImageCount>(
				this.inputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingStartedOperatingNodeState<InputImageCount>(
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
		| ManualOperatingDoneOperatingNodeState<InputImageCount>
		| ManualOperatingStartedOperatingNodeState<InputImageCount> {
		const newGenerator = newOperator.operate(this.inputImages);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(newGeneratorResult.value);
			}
			return new ManualOperatingDoneOperatingNodeState<InputImageCount>(
				this.inputImages,
				newOperator,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingStartedOperatingNodeState<InputImageCount>(
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
	): ManualOperatingStartedOperatingNodeState<InputImageCount> {
		return new ManualOperatingStartedOperatingNodeState<InputImageCount>(
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
	): ManualNoOperatorOperatingNodeState<InputImageCount> {
		return new ManualNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
			this.stepCount,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	):
		| ManualOperatingDoneOperatingNodeState<InputImageCount>
		| ManualOperatingStartedOperatingNodeState<InputImageCount> {
		const newGenerator = this.operator.operate(newInputImages);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(newGeneratorResult.value);
			}
			return new ManualOperatingDoneOperatingNodeState<InputImageCount>(
				newInputImages,
				this.operator,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingStartedOperatingNodeState<InputImageCount>(
				newGenerator,
				newInputImages,
				this.operator,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
}
