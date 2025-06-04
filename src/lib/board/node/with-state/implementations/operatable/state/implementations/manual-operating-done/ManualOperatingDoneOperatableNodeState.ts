import type {HandledEdgeBuilder} from "../../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../../edge/Edge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedOperatingDonedOperatableNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatableNodeState.ts";
import {InstantOperatingDonedOperatableNodeState} from "../instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import {ManualInvalidOperatableNodeState} from "../manual-invalid/ManualInvalidOperatableNodeState.ts";
import {ManualNoOperatorOperatableNodeState} from "../manual-no-operator/ManualNoOperatorOperatableNodeState.ts";
import {ManualOperatingStartedOperatableNodeState} from "../manual-operating-started/ManualOperatingStartedOperatableNodeState.ts";
export class ManualOperatingDonedOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount> {
	public constructor(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		operator: Operator<InputImageCount>,
		outputImage: ImageData,
		stepCount: number,
	) {
		super("doned");
		this.inputImages = inputImages;
		this.operator = operator;
		this.outputImage = outputImage;
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
	): ManualInvalidOperatableNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			this.stepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedOperatingDonedOperatableNodeState<InputImageCount> {
		return new AnimatedOperatingDonedOperatableNodeState<InputImageCount>(
			this.inputImages,
			intervalId,
			intervalIntervalSeconds,
			this.operator,
			this.outputImage,
		);
	}
	public override makeInstant(
		outputEdges: readonly Edge[],
	): InstantOperatingDonedOperatableNodeState<InputImageCount> {
		return new InstantOperatingDonedOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputImage,
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
		const generator = this.operator.operate(this.inputImages);
		const generatorResult = generator.next();
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
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new ManualOperatingStartedOperatableNodeState<InputImageCount>(
				generator,
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
		const generator = newOperator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
				this.inputImages,
				newOperator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new ManualOperatingStartedOperatableNodeState<InputImageCount>(
				generator,
				this.inputImages,
				newOperator,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setStepCount(
		newStepCount: number,
	): ManualOperatingDonedOperatableNodeState<InputImageCount> {
		return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputImage,
			newStepCount,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithImage(this.outputImage);
	}
	public readonly stepCount: number;
	public override unsetOperator(
		outputEdges: readonly Edge[],
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
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
		const generator = this.operator.operate(newInputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
				newInputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new ManualOperatingStartedOperatableNodeState<InputImageCount>(
				generator,
				newInputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
}
