import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedOperatingDonedOperatingNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatingNodeState.ts";
import {InstantOperatingDonedOperatingNodeState} from "../instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
import {ManualInvalidOperatingNodeState} from "../manual-invalid/ManualInvalidOperatingNodeState.ts";
import {ManualNoOperatorOperatingNodeState} from "../manual-no-operator/ManualNoOperatorOperatingNodeState.ts";
import {ManualOperatingStartedOperatingNodeState} from "../manual-operating-started/ManualOperatingStartedOperatingNodeState.ts";
export class ManualOperatingDonedOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
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
	public readonly inputImages: readonly ImageData[] & {
		readonly length: InputImageCount;
	};
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): ManualInvalidOperatingNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new ManualInvalidOperatingNodeState<InputImageCount>(
			this.operator,
			this.stepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedOperatingDonedOperatingNodeState<InputImageCount> {
		return new AnimatedOperatingDonedOperatingNodeState<InputImageCount>(
			this.inputImages,
			intervalId,
			intervalIntervalSeconds,
			this.operator,
			this.outputImage,
		);
	}
	public override makeInstant(
		outputEdges: readonly Edge[],
	): InstantOperatingDonedOperatingNodeState<InputImageCount> {
		return new InstantOperatingDonedOperatingNodeState<InputImageCount>(
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
		| ManualOperatingDonedOperatingNodeState<InputImageCount>
		| ManualOperatingStartedOperatingNodeState<InputImageCount> {
		const generator = this.operator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDonedOperatingNodeState<InputImageCount>(
				this.inputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new ManualOperatingStartedOperatingNodeState<InputImageCount>(
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
		| ManualOperatingDonedOperatingNodeState<InputImageCount>
		| ManualOperatingStartedOperatingNodeState<InputImageCount> {
		const generator = newOperator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDonedOperatingNodeState<InputImageCount>(
				this.inputImages,
				newOperator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new ManualOperatingStartedOperatingNodeState<InputImageCount>(
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
	): ManualOperatingDonedOperatingNodeState<InputImageCount> {
		return new ManualOperatingDonedOperatingNodeState<InputImageCount>(
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
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new ManualNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
			this.stepCount,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithImage(this.outputImage);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	):
		| ManualOperatingDonedOperatingNodeState<InputImageCount>
		| ManualOperatingStartedOperatingNodeState<InputImageCount> {
		const generator = this.operator.operate(newInputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new ManualOperatingDonedOperatingNodeState<InputImageCount>(
				newInputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			for (const edge of outputEdges) {
				edge.unsetImage();
			}
			return new ManualOperatingStartedOperatingNodeState<InputImageCount>(
				generator,
				newInputImages,
				this.operator,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
}
