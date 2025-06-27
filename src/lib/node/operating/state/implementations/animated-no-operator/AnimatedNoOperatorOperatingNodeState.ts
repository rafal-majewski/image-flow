import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedInvalidAndNoOperatorOperatingNodeState} from "../animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatingNodeState.ts";
import {AnimatedOperatingDonedOperatingNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatingNodeState.ts";
import {AnimatedOperatingStartedOperatingNodeState} from "../animated-operating-started/AnimatedOperatingStartedOperatingNodeState.ts";
import {InstantNoOperatorOperatingNodeState} from "../instant-no-operator/InstantNoOperatorOperatingNodeState.ts";
import {ManualNoOperatorOperatingNodeState} from "../manual-no-operator/ManualNoOperatorOperatingNodeState.ts";
export class AnimatedNoOperatorOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.inputImages = inputImages;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
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
	): AnimatedInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		return new AnimatedInvalidAndNoOperatorOperatingNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
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
	): InstantNoOperatorOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new InstantNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualNoOperatorOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new ManualNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
			stepCount,
		);
	}
	public override resetOutputImage(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoOperatorOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override setOperator(
		operator: Operator<InputImageCount>,
		outputEdges: readonly Edge[],
	):
		| AnimatedOperatingStartedOperatingNodeState<InputImageCount>
		| AnimatedOperatingDonedOperatingNodeState<InputImageCount> {
		const generator = operator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const edge of outputEdges) {
				edge.setImage(generatorResult.value);
			}
			return new AnimatedOperatingDonedOperatingNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				operator,
				generatorResult.value,
			);
		} else {
			return new AnimatedOperatingStartedOperatingNodeState<InputImageCount>(
				generator,
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				operator,
				generatorResult.value,
			);
		}
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	): AnimatedNoOperatorOperatingNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatingNodeState<InputImageCount>(
			newInputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
}
