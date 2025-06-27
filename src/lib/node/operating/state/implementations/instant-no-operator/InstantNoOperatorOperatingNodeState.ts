import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedNoOperatorOperatingNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatingNodeState.ts";
import {InstantInvalidAndNoOperatorOperatingNodeState} from "../instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatingNodeState.ts";
import {InstantOperatingDonedOperatingNodeState} from "../instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
import {ManualNoOperatorOperatingNodeState} from "../manual-no-operator/ManualNoOperatorOperatingNodeState.ts";
export class InstantNoOperatorOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
	) {
		super("unconfigured");
		this.inputImages = inputImages;
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
	): InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		return new InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount>();
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoOperatorOperatingNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoOperatorOperatingNodeState<InputImageCount> {
		return new ManualNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
			stepCount,
		);
	}
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
		operator: Operator<InputImageCount>,
		outputEdges: readonly Edge[],
	): InstantOperatingDonedOperatingNodeState<InputImageCount> {
		const generator = operator.operate(this.inputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		for (const edge of outputEdges) {
			edge.setImage(generatorResult.value);
		}
		return new InstantOperatingDonedOperatingNodeState<InputImageCount>(
			this.inputImages,
			operator,
			generatorResult.value,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(outputEdges: readonly Edge[]): this {
		return this;
	}
	public useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	): InstantNoOperatorOperatingNodeState<InputImageCount> {
		return new InstantNoOperatorOperatingNodeState<InputImageCount>(
			newInputImages,
		);
	}
}
