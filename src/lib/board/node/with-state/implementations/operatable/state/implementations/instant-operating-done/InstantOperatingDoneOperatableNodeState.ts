import type {HandledEdgeBuilder} from "../../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../../edge/Edge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedOperatingDonedOperatableNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatableNodeState.ts";
import {InstantInvalidOperatableNodeState} from "../instant-invalid/InstantInvalidOperatableNodeState.ts";
import {InstantNoOperatorOperatableNodeState} from "../instant-no-operator/InstantNoOperatorOperatableNodeState.ts";
import {ManualOperatingDonedOperatableNodeState} from "../manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
import type {ManualOperatingStartedOperatableNodeState} from "../manual-operating-started/ManualOperatingStartedOperatableNodeState.ts";
export class InstantOperatingDonedOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount> {
	public constructor(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
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
	public readonly inputImages: readonly ImageData[]
		& Readonly<{length: InputImageCount}>;
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): InstantInvalidOperatableNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new InstantInvalidOperatableNodeState<InputImageCount>(
			this.operator,
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
	public override makeInstant(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualOperatingDonedOperatableNodeState<InputImageCount> {
		return new ManualOperatingDonedOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputImage,
			stepCount,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithImage(this.outputImage);
	}
	public readonly operator: Operator<InputImageCount>;
	public readonly outputImage: ImageData;
	public override resetOutputImage(
		outputEdges: readonly Edge[],
	):
		| InstantOperatingDonedOperatableNodeState<InputImageCount>
		| ManualOperatingStartedOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(this.inputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
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
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setOperator(
		newOperator: Operator<InputImageCount>,
		outputEdges: readonly Edge[],
	): InstantOperatingDonedOperatableNodeState<InputImageCount> {
		const generator = newOperator.operate(this.inputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		for (const edge of outputEdges) {
			edge.setImage(generatorResult.value);
		}
		return new InstantOperatingDonedOperatableNodeState<InputImageCount>(
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
	): InstantNoOperatorOperatableNodeState<InputImageCount> {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new InstantNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
		);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		outputEdges: readonly Edge[],
	): InstantOperatingDonedOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(newInputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		for (const edge of outputEdges) {
			edge.setImage(generatorResult.value);
		}
		return new InstantOperatingDonedOperatableNodeState<InputImageCount>(
			newInputImages,
			this.operator,
			generatorResult.value,
		);
	}
}
