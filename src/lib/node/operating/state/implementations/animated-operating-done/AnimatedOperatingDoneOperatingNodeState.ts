import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedInvalidOperatingNodeState} from "../animated-invalid/AnimatedInvalidOperatingNodeState.ts";
import {AnimatedNoOperatorOperatingNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatingNodeState.ts";
import {AnimatedOperatingStartedOperatingNodeState} from "../animated-operating-started/AnimatedOperatingStartedOperatingNodeState.ts";
import {InstantOperatingDonedOperatingNodeState} from "../instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
import {ManualOperatingDonedOperatingNodeState} from "../manual-operating-done/ManualOperatingDoneOperatingNodeState.ts";
export class AnimatedOperatingDonedOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
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
	public readonly inputImages: readonly ImageData[] & {
		readonly length: InputImageCount;
	};
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): AnimatedInvalidOperatingNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
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
		return new InstantOperatingDonedOperatingNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputImage,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualOperatingDonedOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new ManualOperatingDonedOperatingNodeState<InputImageCount>(
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
		const generator = this.operator.operate(this.inputImages);
		const generatorResult = generator.next();
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
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new AnimatedOperatingStartedOperatingNodeState<InputImageCount>(
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
	): AnimatedOperatingDonedOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedOperatingDonedOperatingNodeState<InputImageCount>(
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
		const generator = newOperator.operate(this.inputImages);
		const generatorResult = generator.next();
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
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new AnimatedOperatingStartedOperatingNodeState<InputImageCount>(
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
	): AnimatedNoOperatorOperatingNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new AnimatedNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithImage(this.outputImage);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	):
		| AnimatedOperatingDonedOperatingNodeState<InputImageCount>
		| AnimatedOperatingStartedOperatingNodeState<InputImageCount> {
		const generator = this.operator.operate(newInputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new AnimatedOperatingDonedOperatingNodeState<InputImageCount>(
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
			return new AnimatedOperatingStartedOperatingNodeState<InputImageCount>(
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
