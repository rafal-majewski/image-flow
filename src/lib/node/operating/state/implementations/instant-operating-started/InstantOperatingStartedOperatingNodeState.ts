import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {ManualOperatingStartedOperatingNodeState} from "../manual-operating-started/ManualOperatingStartedOperatingNodeState.ts";
import {InstantOperatingDoneOperatingNodeState} from "../instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
import {InstantInvalidOperatingNodeState} from "../instant-invalid/InstantInvalidOperatingNodeState.ts";
import {AnimatedOperatingStartedOperatingNodeState} from "../animated-operating-started/AnimatedOperatingStartedOperatingNodeState.ts";
import {InstantNoOperatorOperatingNodeState} from "../instant-no-operator/InstantNoOperatorOperatingNodeState.ts";
export class InstantOperatingStartedOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		generator: Generator<ImageData, ImageData, void>,
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
		operator: Operator<InputImageCount>,
		outputImage: ImageData,
	) {
		super("started");
		this.intervalId = intervalId;
		this.generator = generator;
		this.inputImages = inputImages;
		this.operator = operator;
		this.outputImage = outputImage;
	}
	public override doAnimatedSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override doInstantSteps(
		outputEdges: readonly Edge[],
	):
		| InstantOperatingStartedOperatingNodeState<InputImageCount>
		| InstantOperatingDoneOperatingNodeState<InputImageCount> {
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
				this.intervalId,
				this.inputImages,
				this.operator,
				generatorResult.value,
			);
		} else {
			return new InstantOperatingStartedOperatingNodeState<InputImageCount>(
				this.intervalId,
				this.generator,
				this.inputImages,
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
	public readonly intervalId: ReturnType<typeof setInterval>;
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): InstantInvalidOperatingNodeState<InputImageCount> {
		return new InstantInvalidOperatingNodeState<InputImageCount>(
			this.intervalId,
			this.operator,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedOperatingStartedOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
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
		newIntervalId: ReturnType<typeof setInterval>,
		outputEdges: readonly Edge[],
	): InstantOperatingStartedOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new InstantOperatingStartedOperatingNodeState<InputImageCount>(
			newIntervalId,
			this.generator,
			this.inputImages,
			this.operator,
			this.outputImage,
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
	):
		| InstantOperatingDoneOperatingNodeState<InputImageCount>
		| InstantOperatingStartedOperatingNodeState<InputImageCount> {
		const timestamp = new Date();
		const generator = newOperator.operate(this.inputImages);
		let generatorResult = generator.next();
		while (
			!generatorResult.done
			&& (new Date().getTime() - timestamp.getTime()) / 1000 < 0.1
		) {
			generatorResult = generator.next();
		}
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new InstantOperatingDoneOperatingNodeState<InputImageCount>(
				this.intervalId,
				this.inputImages,
				newOperator,
				generatorResult.value,
			);
		} else {
			return new InstantOperatingStartedOperatingNodeState<InputImageCount>(
				this.intervalId,
				generator,
				this.inputImages,
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
	): InstantNoOperatorOperatingNodeState<InputImageCount> {
		return new InstantNoOperatorOperatingNodeState<InputImageCount>(
			this.intervalId,
			this.inputImages,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	):
		| InstantOperatingDoneOperatingNodeState<InputImageCount>
		| InstantOperatingStartedOperatingNodeState<InputImageCount> {
		const timestamp = new Date();
		const generator = this.operator.operate(newInputImages);
		let generatorResult = generator.next();
		while (
			!generatorResult.done
			&& (new Date().getTime() - timestamp.getTime()) / 1000 < 0.1
		) {
			generatorResult = generator.next();
		}
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new InstantOperatingDoneOperatingNodeState<InputImageCount>(
				this.intervalId,
				newInputImages,
				this.operator,
				generatorResult.value,
			);
		} else {
			return new InstantOperatingStartedOperatingNodeState<InputImageCount>(
				this.intervalId,
				generator,
				newInputImages,
				this.operator,
				generatorResult.value,
			);
		}
	}
}
