import type {HandledEdgeBuilder} from "../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../edge/Edge.ts";
import type {Operator} from "../../../../operator/Operator.ts";
import {OperatingNodeState} from "../../OperatingNodeState.ts";
import {AnimatedInvalidOperatingNodeState} from "../animated-invalid/AnimatedInvalidOperatingNodeState.ts";
import {InstantInvalidAndNoOperatorOperatingNodeState} from "../instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatingNodeState.ts";
import {InstantOperatingDoneOperatingNodeState} from "../instant-operating-done/InstantOperatingDoneOperatingNodeState.ts";
import {InstantOperatingStartedOperatingNodeState} from "../instant-operating-started/InstantOperatingStartedOperatingNodeState.ts";
import {ManualInvalidOperatingNodeState} from "../manual-invalid/ManualInvalidOperatingNodeState.ts";
export class InstantInvalidOperatingNodeState<
	InputImageCount extends number,
> extends OperatingNodeState<InputImageCount> {
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		operator: Operator<InputImageCount>,
	) {
		super("unconfigured");
		this.intervalId = intervalId;
		this.operator = operator;
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
	public readonly intervalId: ReturnType<typeof setInterval>;
	public override invalidateInputImages(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedInvalidOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedInvalidOperatingNodeState<InputImageCount>(
			intervalId,
			intervalIntervalSeconds,
			this.operator,
		);
	}
	public override makeInstant(
		newIntervalId: ReturnType<typeof setInterval>,
		outputEdges: readonly Edge[],
	): InstantInvalidOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new InstantInvalidOperatingNodeState<InputImageCount>(
			newIntervalId,
			this.operator,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualInvalidOperatingNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new ManualInvalidOperatingNodeState<InputImageCount>(
			this.operator,
			stepCount,
		);
	}
	public readonly operator: Operator<InputImageCount>;
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
	): InstantInvalidOperatingNodeState<InputImageCount> {
		return new InstantInvalidOperatingNodeState<InputImageCount>(
			this.intervalId,
			newOperator,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(
		outputEdges: readonly Edge[],
	): InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount> {
		return new InstantInvalidAndNoOperatorOperatingNodeState<InputImageCount>(
			this.intervalId,
		);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	):
		| InstantOperatingDoneOperatingNodeState<InputImageCount>
		| InstantOperatingStartedOperatingNodeState<InputImageCount> {
		const timestamp = new Date();
		const generator = this.operator.operate(inputImages);
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
				inputImages,
				this.operator,
				generatorResult.value,
			);
		} else {
			return new InstantOperatingStartedOperatingNodeState<InputImageCount>(
				this.intervalId,
				generator,
				inputImages,
				this.operator,
				generatorResult.value,
			);
		}
	}
}
