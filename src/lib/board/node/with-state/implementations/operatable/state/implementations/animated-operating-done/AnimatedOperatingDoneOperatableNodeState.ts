import type {HandledEdgeBuilder} from "../../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../../edge/Edge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidOperatableNodeState} from "../animated-invalid/AnimatedInvalidOperatableNodeState.ts";
import {AnimatedNoOperatorOperatableNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatableNodeState.ts";
import {AnimatedOperatingStartedOperatableNodeState} from "../animated-operating-started/AnimatedOperatingStartedOperatableNodeState.ts";
import {InstantOperatingDonedOperatableNodeState} from "../instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import {ManualOperatingDonedOperatableNodeState} from "../manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
export class AnimatedOperatingDonedOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount> {
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithImage(this.outputImage);
	}
	public constructor(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		operator: Operator<InputImageCount>,
		outputImage: ImageData,
	) {
		super("doned");
		this.inputImages = inputImages;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.operator = operator;
		this.outputImage = outputImage;
	}
	public override doAnimatedStep(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	public readonly inputImages: readonly ImageData[]
		& Readonly<{length: InputImageCount}>;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): AnimatedInvalidOperatableNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new AnimatedInvalidOperatableNodeState<InputImageCount>(
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
	): InstantOperatingDonedOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new InstantOperatingDonedOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputImage,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualOperatingDonedOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
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
		| AnimatedOperatingDonedOperatableNodeState<InputImageCount>
		| AnimatedOperatingStartedOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new AnimatedOperatingDonedOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				generatorResult.value,
			);
		} else {
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new AnimatedOperatingStartedOperatableNodeState<InputImageCount>(
				generator,
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
	): AnimatedOperatingDonedOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedOperatingDonedOperatableNodeState<InputImageCount>(
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
		| AnimatedOperatingDonedOperatableNodeState<InputImageCount>
		| AnimatedOperatingStartedOperatableNodeState<InputImageCount> {
		const generator = newOperator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new AnimatedOperatingDonedOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				newOperator,
				generatorResult.value,
			);
		} else {
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new AnimatedOperatingStartedOperatableNodeState<InputImageCount>(
				generator,
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				newOperator,
				generatorResult.value,
			);
		}
	}
	public override setStepCount(newStepCount: number): this {
		return this;
	}
	public override unsetOperator(
		outputEdges: readonly Edge[],
	): AnimatedNoOperatorOperatableNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new AnimatedNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		outputEdges: readonly Edge[],
	):
		| AnimatedOperatingDonedOperatableNodeState<InputImageCount>
		| AnimatedOperatingStartedOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(newInputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new AnimatedOperatingDonedOperatableNodeState<InputImageCount>(
				newInputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				generatorResult.value,
			);
		} else {
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new AnimatedOperatingStartedOperatableNodeState<InputImageCount>(
				generator,
				newInputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				generatorResult.value,
			);
		}
	}
}
