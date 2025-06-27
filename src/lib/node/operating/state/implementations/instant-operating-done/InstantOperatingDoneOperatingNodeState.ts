import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedOperatingDonedOperatingNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatingNodeState.ts";
import {InstantInvalidOperatingNodeState} from "../instant-invalid/InstantInvalidOperatingNodeState.ts";
import {InstantNoOperatorOperatingNodeState} from "../instant-no-operator/InstantNoOperatorOperatingNodeState.ts";
import {ManualOperatingDonedOperatingNodeState} from "../manual-operating-done/ManualOperatingDoneOperatingNodeState.ts";
import type {ManualOperatingStartedOperatingNodeState} from "../manual-operating-started/ManualOperatingStartedOperatingNodeState.ts";
export class InstantOperatingDonedOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
		operator: Operator<InputImageCount>,
		outputImage: ImageData,
	) {
		super("doned");
		this.inputImages = inputImages;
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
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): InstantInvalidOperatingNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new InstantInvalidOperatingNodeState<InputImageCount>(this.operator);
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
	public override makeInstant(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualOperatingDonedOperatingNodeState<InputImageCount> {
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
		| InstantOperatingDonedOperatingNodeState<InputImageCount>
		| ManualOperatingStartedOperatingNodeState<InputImageCount> {
		const generator = this.operator.operate(this.inputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
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
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setOperator(
		newOperator: Operator<InputImageCount>,
		outputEdges: readonly Edge[],
	): InstantOperatingDonedOperatingNodeState<InputImageCount> {
		const generator = newOperator.operate(this.inputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		for (const edge of outputEdges) {
			edge.setImage(generatorResult.value);
		}
		return new InstantOperatingDonedOperatingNodeState<InputImageCount>(
			this.inputImages,
			newOperator,
			generatorResult.value,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(
		outputEdges: readonly Edge[],
	): InstantNoOperatorOperatingNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new InstantNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithImage(this.outputImage);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	): InstantOperatingDonedOperatingNodeState<InputImageCount> {
		const generator = this.operator.operate(newInputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		for (const edge of outputEdges) {
			edge.setImage(generatorResult.value);
		}
		return new InstantOperatingDonedOperatingNodeState<InputImageCount>(
			newInputImages,
			this.operator,
			generatorResult.value,
		);
	}
}
