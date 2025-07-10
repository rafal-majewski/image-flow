import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedNoOperatorOperatingNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatingNodeState.ts";
import {InstantInvalidAndNoOperatorOperatingNodeState} from "../instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatingNodeState.ts";
import {InstantOperatingDoneOperatingNodeState} from "../instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
import {InstantOperatingStartedOperatingNodeState} from "../instant-operating-started/InstantOperatingStartedOperatingNodeState.ts";
import {ManualNoOperatorOperatingNodeState} from "../manual-no-operator/ManualNoOperatorOperatingNodeState.ts";
export class InstantNoOperatorOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
	) {
		super("unconfigured");
		this.intervalId = intervalId;
		this.inputImages = inputImages;
	}
	public override doAnimatedSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override doInstantSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly Edge[]): this {
		return this;
	}
	public readonly inputImages: readonly ImageData[] & {
		readonly length: InputImageCount;
	};
	public readonly intervalId: ReturnType<typeof setInterval>;
	public override invalidateInputImages(
		outputEdges: readonly Edge[],
	): InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		return new InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount>(
			this.intervalId,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoOperatorOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedNoOperatorOperatingNodeState<InputImageCount>(
			this.inputImages,
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		newIntervalId: ReturnType<typeof setInterval>,
		outputEdges: readonly Edge[],
	): InstantNoOperatorOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new InstantNoOperatorOperatingNodeState<InputImageCount>(
			newIntervalId,
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
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setOperator(
		operator: Operator<InputImageCount>,
		outputEdges: readonly Edge[],
	):
		| InstantOperatingDoneOperatingNodeState<InputImageCount>
		| InstantOperatingStartedOperatingNodeState<InputImageCount> {
		const timestamp = new Date();
		const generator = operator.operate(this.inputImages);
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
				operator,
				generatorResult.value,
			);
		} else {
			return new InstantOperatingStartedOperatingNodeState<InputImageCount>(
				this.intervalId,
				generator,
				this.inputImages,
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
	): InstantNoOperatorOperatingNodeState<InputImageCount> {
		return new InstantNoOperatorOperatingNodeState<InputImageCount>(
			this.intervalId,
			newInputImages,
		);
	}
}
